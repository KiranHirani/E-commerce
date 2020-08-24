import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order-service.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  userId: string = '';
  array:any[]=[];
  path:string='';

  constructor(private orderService: OrderService, private authService: AuthService,
    private route:ActivatedRoute) {
      this.routes();
     }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.userId = user.uid;
      this.orderService.getOrdersByUser(user.uid).subscribe(
        data => {
          console.log(data);
          this.array.push(data);
        })
      });
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
