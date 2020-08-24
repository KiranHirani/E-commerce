import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../model/AppUser';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../model/ShoppingCart';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  appUser: AppUser
  totalQuantity: number;

  // user$:Observable<firebase.User>;
  //By convention, we give $ sign to our observables

  constructor(
    public auth: AuthService,
    private shoppingcartService: ShoppingCartService
    ) 
    {
    // this.user$=auth.user$;
    //auth state is an observable and represents the authentication state of the cuurrent user

    auth.appUser$.subscribe(x => {
      if (x == null) {
        this.appUser = null;
      }
      else {
        x.subscribe(y => this.appUser = y);
      }
    });
  }


  logout() {
    this.auth.logout();
  }

   ngOnInit()
   {
     this.shoppingCart();
   }

   //Calculate the total no. od shopping cart items 
  async shoppingCart() {
    let cart$ = await this.shoppingcartService.getCart();
    cart$.valueChanges().subscribe(cart=>
    {
      this.totalQuantity=0;
      if(!cart || !cart.items) 
      {
        this.totalQuantity=0; 
      }
      else
      {
      for(let productId in cart.items)
      {
        this.totalQuantity+=cart.items[productId].quantity
      }
    }
    })
    // let cart$= this.shoppingcartService.getCart();
    // cart$.valueChanges().subscribe(data=>
    //   {
    //     console.log(data);
    //     this.totalQuantity=0;
    //     if(!data)
    //     this.totalQuantity=0;

    //     for(let key in data['items'])
    //     {
    //       this.totalQuantity+=data.items[key].quantity;
    //     }
    //   }
    //   );
  }
}
