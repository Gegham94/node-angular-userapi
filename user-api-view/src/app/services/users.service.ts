import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URL = environment.API_URL;
  httpOptions : any;
  token;
  
  constructor(private http: HttpClient) { 
    this.token = localStorage.getItem('access_token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'x-authorization': `${this.token}`,
        'content-type': 'application/json'
      })
    }
  }

  getAll() {
    return this.http.get(`${this.API_URL}/users-api/list`, this.httpOptions);
  }
  getById(id: any) {
    return this.http.get(`${this.API_URL}/users-api/${id}`, this.httpOptions);
  }
  update(id: any, user: FormData) {
    return this.http.put(`${this.API_URL}/users-api/update/${id}`, user, this.httpOptions);
  }
  delete(id: any) {
    return this.http.delete(`${this.API_URL}/users-api/delete/${id}`, this.httpOptions);
  }
  sendEmailVerifyMessage(email:any, firstName:any, verifyAfterCreate:any) {
    return this.http.post(`${this.API_URL}/users-api/email/send/verify`, {
      email,
      firstName,
      verifyAfterCreate
    }, this.httpOptions);
  }

}
