import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../model/ShoppingCart';
import { ShoppingCartItem } from '../model/ShoppingCartItem';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService) {
    // this.shoppingItem=new ShoppingCartItem();
    this.sc=new ShoppingCart();
     }

  cart$;
  count;
  arrayItems: any[] = [];
  sc: ShoppingCart;

  async ngOnInit() {
   this.cart$= await this.shoppingCartService.getCart();
    this.cart$.valueChanges()
      .subscribe(x =>
        {
        if(x!=null)
        {
        // this.arrayItems = x.items;
        this.sc = new ShoppingCart(x.items);
        this.count = this.sc.totalItemsCount;
        console.log(this.sc);
        }
      });
  }
  clearCart()
{
  this.shoppingCartService.clearCart();
  this.sc=new ShoppingCart();
  this.count=0;
}

}
