import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/Core/Services/product.service';
import { Product } from 'src/app/Core/Services/interfaces/product';
import { FormsModule } from '@angular/forms';
import { FilterPipeModule } from 'ngx-filter-pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,FilterPipeModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(private _ProductService:ProductService){

  }

  products:Product[]=[];

  totalProducts: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  loading: boolean = false;
  searchItem: string = '';



  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.loading = true;
    this._ProductService.getAllProducts(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.products = response.products;
        this.totalProducts = response.total;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error Not Found products:', err);
        this.products = [];
        this.totalProducts = 0;
        this.loading = false;
      }
    });
  }




  SearchForProduct():void{
    this.loading=true;
    this._ProductService.SearchProduct(this.searchItem).subscribe({
      next:(response)=>{
        this.products=response.products;
        this.totalProducts=response.total;
        this.loading=false;
      }
    })
  }


  changePage(page: number): void {
    if (page < 1 || page > (this.totalProducts / this.pageSize)) return;
    this.currentPage = page;
    this.getAllProducts();
  }

  onSearch(): void {
    this.currentPage = 1; 
    this.SearchForProduct();
  }

}
