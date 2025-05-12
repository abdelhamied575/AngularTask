import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from './interfaces/api-response';
import { Productdata } from './interfaces/productdata';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient)
  {

  }


  baseUrl:string='https://dummyjson.com/products'


  getAllProducts(page: number = 1, limit: number = 10): Observable<ApiResponse> {
    const skip = (page - 1) * limit;
    const url = `${this.baseUrl}?limit=${limit}&skip=${skip}`;
    return this._HttpClient.get<ApiResponse>(url);
  }


  SearchProduct(searchItem:string='',page: number = 1, limit: number = 10):Observable<ApiResponse>{
    const skip = (page - 1) * limit;
    return this._HttpClient.get<ApiResponse>(this.baseUrl+`/search?q=${searchItem}&limit=${limit}&skip=${skip}`)
  }

  sortProducts(sortBy:string='',order:string='asc',page: number = 1, limit: number = 10):Observable<ApiResponse>{
    const skip = (page - 1) * limit;
    const url=this.baseUrl+`?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}`;
    return this._HttpClient.get<ApiResponse>(url)
  }


  addProduct(product:Productdata):Observable<ApiResponse>{
    return this._HttpClient.post<ApiResponse>(this.baseUrl+`/add`,product)
  }

  getProductById(id:number):Observable<Productdata>{
    return this._HttpClient.get<Productdata>(this.baseUrl+`/${id}`)
  }

  updateProduct(id:number,product:Productdata):Observable<Productdata>{
    return this._HttpClient.put<Productdata>(this.baseUrl+`/${id}`,product)
  }


}

