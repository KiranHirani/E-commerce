import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../model/Product';
import { ShoppingCartService } from '../services/shopping-cart.service';
import {ShoppingCart} from '../model/ShoppingCart';
@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  constructor(private cartService:ShoppingCartService) {
    // this.shoppingCart.items=[];
   }

  @Input('product') product:Product;
  @Input('show-actions') showActions=true;
  @Input('shopping-cart') shoppingCart:ShoppingCart;
  
  addToCart()
  {
    this.cartService.addToCart(this.product);
  }

  removeFromCart()
  {
    this.cartService.remove(this.product);
  }

  getQuantity()
  {
    if(!this.shoppingCart || !this.shoppingCart.items) return 0;
    let item= this.shoppingCart.items[this.product.key]; //returns a reference to that shopping cart item 
    if(item)
       return item.quantity;
    else 
      return 0;
  } 
}
