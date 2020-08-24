import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/model/Product';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {

  products$;
  itemCount;
  array: any[] = [];
  sample: Product[];
  obj: Product;
  dataSource: MatTableDataSource<any>;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

  }

  constructor(private productService: ProductService) {
    this.obj = new Product();
    this.sample = [];
    this.get();
  }

  displayedColumns: string[] = ['title', 'price', 'edit'];

  get() {
    this.products$ = this.productService.getAll();
    this.products$.subscribe(data => {
      this.array = data;
      // console.log(data);
      for (let i = 0; i < this.array.length; i++) {
        this.obj.key = this.array[i].key;
        this.obj.title = this.array[i].value.title;
        this.obj.category = this.array[i].value.category;
        this.obj.price = this.array[i].value.price;
        this.obj.imageUrl = this.array[i].value.image;
        this.sample.push(this.obj);
        this.obj = new Product();
      }
      this.dataSource = new MatTableDataSource(this.sample);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
    console.log(this.sample);
  }


  filter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  ngOnDestroy() { }



}
