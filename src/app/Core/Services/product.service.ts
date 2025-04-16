import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from './interfaces/api-response';

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


  SearchProduct(searchItem:string=''):Observable<ApiResponse>{
    return this._HttpClient.get<ApiResponse>(this.baseUrl+`/search?q=${searchItem}`)
  }


}

