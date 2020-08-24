import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../model/Order';
import { OrderService } from '../order-service.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-my-orders',
  templateUrl: './view-my-orders.component.html',
  styleUrls: ['./view-my-orders.component.css']
})
export class ViewMyOrdersComponent implements OnInit {

  path;
  order$: Observable<Order>;
  order;
  price = 0;
  userName;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private authService: AuthService) {
    this.authService.user$.subscribe(user => this.userName = user.displayName);
  }

  ngOnInit() {
    this.path = this.route.snapshot.paramMap.get('orderId');
    this.order$ = this.orderService.getOrder(this.path).valueChanges();
    this.order$.subscribe(data => {
      this.order = data;
      for (let i = 0; i < data.items.length; i++) {
        this.price += this.order.items[i].totalPrice
      }
    })
  }

}
