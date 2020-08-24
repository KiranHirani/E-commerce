import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../model/Product';
import { ShoppingCartService } from '../services/shopping-cart.service';
import {ShoppingCart} from '../model/ShoppingCart';
@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent{

  @Input('product') product:Product;
  @Input('shopping-cart') shoppingCart:ShoppingCart;

  constructor(private cartService:ShoppingCartService) { }


  addToCart()
  {
    this.cartService.addToCart(this.product);
  }

  removeFromCart()
  {
    this.cartService.remove(this.product);
  }

//   getQuantity()
// {
//     let item = this.shoppingCart.items[this.product.key]; //returns a reference to that shopping cart item 
//     if (item)
//         return item.quantity;
//     else
//         return 0;
// }

}
