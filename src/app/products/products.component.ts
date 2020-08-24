import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/Product';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{

  array: any[] = [];
  products: Product[] = [];
  product: Product = new Product();
  shoppingCart;
  subscription:Subscription;
  categoryPath;
  filteredProducts: Product[] = [];

  ngOnInit() {
    this.getShoppingCart();
  }
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
  ) {
    this.productService.getAll()
      .subscribe(data => {
        this.array = data;
        for (let i = 0; i < data.length; i++) {
          this.product.key = this.array[i].key
          this.product.title = this.array[i].value.title;
          this.product.imageUrl = this.array[i].value.image;
          this.product.price = this.array[i].value.price;
          this.product.category = this.array[i].value.category;
          this.products.push(this.product);
          this.product = new Product();
        }
        this.routes();
      });
  }

  routes() {
    this.route.queryParamMap.subscribe(params => {
      this.categoryPath = params.get('category');
      //we mention the name of the parameter 
      this.filter();
    });
  }

  filter() {
    this.filteredProducts = (this.categoryPath) ?
      this.products.filter(data => data.category === this.categoryPath)
      : this.products;
  }

 async getShoppingCart()
  {
    //await bcoz this getCart method returns a promise 
    let cart= await this.cartService.getCart();
    this.subscription=cart.valueChanges()
    .subscribe(
      cart =>
      {
        this.shoppingCart=cart;
      });  
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }


}
