import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }



  login(userData:object):Observable<any>
  {
    return this._HttpClient.post('https://dummyjson.com/auth/login',userData)
  }


  isLoggedIn(): boolean {
    if (localStorage.getItem('userToken')) {
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('userToken');
  }




}
