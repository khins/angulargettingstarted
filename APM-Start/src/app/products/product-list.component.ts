import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './products.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
  })
export class ProductListComponent implements OnInit{
  
  constructor(private productService: ProductService) {
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  
  ngOnInit(): void {
    console.log('in OnInit');
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => this.errorMessage = <any>error
    );
  }

 pageTitle: string = 'Product Extravaganza List!!';
 imageWidth: number=50;
 imageMargin: number=2;
 showImage: boolean = false;
 filteredProducts: IProduct[];
 errorMessage: string;

 private _listFilter : string;
 public get listFilter() : string {
   return this._listFilter;
 }
 public set listFilter(v : string) {
   this._listFilter = v;
   this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
 }
 

 products: IProduct[] =[ ];

 onRatingClicked(message: string): void {
    this.pageTitle = 'Product List ' + message;
 }

 toggleImage(): void{
  this.showImage = !this.showImage;
 }
 
}