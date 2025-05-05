import { RouterLink } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/Core/Services/product.service';
import { Product } from 'src/app/Core/Services/interfaces/product';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, 
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {


  constructor(private _ProductService:ProductService){

  }



  displayedColumns: string[] = ['image', 'title', 'description', 'price', 'rating', 'tags', 'brand','edit'];
  dataSource = new MatTableDataSource<Product>([]);
  
  totalProducts: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  searchItem: string = '';
  pageSizeOptions: number[] = [5, 10, 25, 50];
  sortBy: string = '';
  orderOptions: string[] = ['asc', 'desc'];
  selectedOrder: string = '';
  sortOptions: string[] = ['title', 'price', 'rating'];

  private destroy = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllProducts(): void {
    this._ProductService.getAllProducts(this.currentPage, this.pageSize).pipe(takeUntil(this.destroy)).subscribe({
      next: (response) => {
        this.dataSource.data = response.products;
        this.totalProducts = response.total;
      },
      error: (err) => {
        console.error('Error Not Found products:', err);
        this.dataSource.data = [];
        this.totalProducts = 0;
      }
    });
  }

  sortProducts(): void {
    this._ProductService.sortProducts(this.sortBy, this.selectedOrder, this.currentPage, this.pageSize)
    .pipe(takeUntil(this.destroy)).subscribe({
      next: (response) => {
        this.dataSource.data = response.products;
        this.totalProducts = response.total;
      },
      error: (err) => {
        console.error('Error Not Found products:', err);
        this.dataSource.data = [];
        this.totalProducts = 0;
      }
    });
  }

  SearchForProduct(): void {
    this._ProductService.SearchProduct(this.searchItem)
    .pipe(takeUntil(this.destroy)).subscribe({
      next: (response) => {
        this.dataSource.data = response.products;
        this.totalProducts = response.total;
      }
    });
  }

  onChangePage(page: number): void {
    if (page < 1 || page > (this.totalProducts / this.pageSize)) return;
    this.currentPage = page;
    if (this.sortBy) {
      this.sortProducts();
    } else {
      this.getAllProducts();
    }
  }

  onSearch(): void {
    this.currentPage = 1;
    this.SearchForProduct();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }




}
