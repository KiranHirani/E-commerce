import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  category:any[]=[];

  constructor(  private categoryService:CategoryService,) { }

  ngOnInit(): void {
    this.getCategories();
  }

  @Input('categoryPath') categoryPath;

  getCategories()
  {
    this.categoryService.getCategories()
    .subscribe(data=>
    {
      this.category=data;
    });
  }
}
