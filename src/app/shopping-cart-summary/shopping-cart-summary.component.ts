import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../model/ShoppingCart';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { OrderService } from '../order-service.service';
import { Order } from '../model/Order';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent {

  cart: ShoppingCart = new ShoppingCart();
  array: any[] = [];
  price = 0;

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe(cart => {
      this.cart = cart;
      this.array = Object.entries(this.cart.items).map(c => {
        this.price += c[1].price * c[1].quantity;
        return {
          title: c[1].title,
          cost: c[1].price,
          quantity: c[1].quantity
        }
      });
    });
  }
}