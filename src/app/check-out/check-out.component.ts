import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../model/ShoppingCart';
import { Subscription } from 'rxjs';
import { Order } from '../model/Order';
import { OrderService } from '../order-service.service';
import 'rxjs/add/operator/map';
import { ShoppingCartItem } from '../model/ShoppingCartItem';
import { combineAll } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit{
  shipping:{};
  cart:ShoppingCart;
  userId:string;
  cartSubscription:Subscription;
  userSubscription:Subscription;
  array:any[]=[];
  order:Order;

  constructor(
    private authService:AuthService,
    private shoppingCartService:ShoppingCartService,
    private orderService:OrderService,
    private router:Router) { }

   async ngOnInit()
  {
   let cart$=await this.shoppingCartService.getCart();
   this.cartSubscription=cart$.valueChanges().subscribe(cart=>
    {
      this.cart=cart;
      Object.entries(this.cart.items).forEach(x=>
        {
           this.array.push(x[1]);
        });
    });
   
   this.userSubscription=this.authService.user$.subscribe(user=>
    {
      this.userId=user.uid;
    })
  }

 
  ngOnDestroy()
  {
     this.cartSubscription.unsubscribe();
     this.userSubscription.unsubscribe();
  }

async save(form)
{
  let object=new Order(this.userId,form.value,this.cart);
  let result=await this.orderService.placeOrders(object); //returns a promise 
  this.router.navigate(['/order-success',result.key]);
}

}
