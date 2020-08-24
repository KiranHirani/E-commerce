import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, snapshotChanges } from '@angular/fire/database';
import { Product } from '../model/Product';
import 'rxjs/add/operator/take';
import { ShoppingCart } from '../model/ShoppingCart';
import { Observable } from 'rxjs';
import { ShoppingCartItem } from '../model/ShoppingCartItem';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }
  //Responsible for creating a shopping cart, when user  clicks on addToCart button
  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  //Responsible for getting a reference to a shopping cart 
  private async getOrCreateCart() {
    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;
    //storing cartId in shopping-cart

      let result=await this.create(); 
      localStorage.setItem('cartId', result.key);
      return result.key;
  
  }

  //Reading a shopping cart(+items in it) from firebase
    async getCart():Promise<AngularFireObject<ShoppingCart>> {
    let cartId= await this.getOrCreateCart();
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem(cartId, key): AngularFireObject<ShoppingCartItem> {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + key);
  }

  async addToCart(product: Product) 
  {
    this.update(product,1);
  }

  async remove(product:Product)
  {
    this.update(product,-1);
  }


  private async update(product:Product,change)
  {
    let cartId= await this.getOrCreateCart();
    let item$= this.getItem(cartId,product.key);

    item$.valueChanges().take(1)
    .subscribe(item=>{
      let qty=(item!=null? item.quantity: 0) + change;
      if(qty===0)
      {
        item$.remove();
      }
      else item$.update({
            title: product.title,
            category: product.category,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity:qty
      })
    
    })
  }

  async clearCart()
  {
   let cartId=await this.getOrCreateCart();
   this.db.object('/shopping-carts/'+cartId+'/items').remove();

}
}
