import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories$;
  array;
  id;
  product;
  //so that we don't get null pointer exception , also useful when adding a new product 
  //coz we won't 

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute) {
  
    this.product={};

    this.categories$ = categoryService.getCategories();
    this.categories$.subscribe(x => {
      this.array = x,
        console.log(x)
    });
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getProduct(this.id)
        .valueChanges()
        .take(1)
        .subscribe(p => {
          console.log(p);
          this.product = p;
        });
    }
  }

  ngOnInit() {
    this.edit();
  }

  save(createProduct) {
    if (this.id) {
      this.productService.update(this.id, createProduct);
    }
    else {
      this.productService.create(createProduct);
    }
    console.log(createProduct);
    this.router.navigate(['/admin/products']);
  }

  edit() {
    console.log("Edit");
    
    //Name that we mentioned in the app module as parameter 

  }

  delete()
  {
    //JS confirm box to delete
    //passed product id here because we will have this inside the form, we alreday have the id
    if(!confirm('Are you sure you want to delete this product?'))
    return;
    {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  
  }


}



//we can also write 
//categoryService.getCategories() and we can unwrap it using async pipe in 
//template 
// by writing *ngFor="let c of categories | async"