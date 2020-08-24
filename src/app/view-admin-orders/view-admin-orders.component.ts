import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order-service.service';
import { Order } from '../model/Order';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'view-admin-orders',
  templateUrl: './view-admin-orders.component.html',
  styleUrls: ['./view-admin-orders.component.css']
})
export class ViewAdminOrdersComponent implements OnInit {

  path;
  order$:Observable<Order>;
  order;
  userName;
  price=0;
  items:any[]=[];
  constructor(private route:ActivatedRoute,private orderService:OrderService,private authService:AuthService) {
    this.authService.user$.subscribe(user=>this.userName=user.displayName);
   }

  ngOnInit(){

    this.path=this.route.snapshot.paramMap.get('orderId');
    this.order$=this.orderService.getOrder(this.path).valueChanges();
    this.order$.subscribe(
      data=>
      {
        this.order=data;
        for(let i=0;i<data.items.length;i++)
        {
         this.price+=this.order.items[i].totalPrice;
        }
      });
  }
  
  totalAmount()
  {
    
  }
}
