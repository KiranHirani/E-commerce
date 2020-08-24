import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/order-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  constructor(private orderService:OrderService, private route:ActivatedRoute) { }
  orders:any[]=[];
  array:any[]=[];
  path;
  ngOnInit()
  {
       this.orderService.getOrders().subscribe(data=>
        {
          this.orders.push(data);
        });
       this.routes();
  }
  routes()
  {
    this.route.queryParamMap.subscribe(path=>
      {
         this.path=path.get('orderId');
         console.log(this.path);
      })
  }

  
}
