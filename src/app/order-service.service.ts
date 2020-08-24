import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { ShoppingCartService } from './services/shopping-cart.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Order } from './model/Order';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db:AngularFireDatabase, private shoppingCartService:ShoppingCartService) {

  }

  async placeOrders(order)
   {
    let result= await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
   }

   getOrders()
   {
      return this.db.list('/orders').snapshotChanges()
      .pipe(map
        (changes=>
          changes.map(c=>
          ({
            key:c.key,
            value:c.payload.val()
          }))
        ));
   }

   getOrder(path):AngularFireObject<Order>
   {
     return this.db.object('/orders/'+path);
   }

   getOrdersByUser(userId:string)
   {
     return this.db.list('/orders',query=>{
      return query.orderByChild('userId').equalTo(userId);
     }).snapshotChanges().pipe(map
      (changes=>
        changes.map(c=>
        ({
          key:c.key,
          value:c.payload.val()
        }))
      ));
   }


}
