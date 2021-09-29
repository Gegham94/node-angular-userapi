import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URL = environment.API_URL;
  httpOptions : any;
  token;
  
  constructor(private http: HttpClient, public fb: FormBuilder) { 
    this.token = localStorage.getItem('access_token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'x-authorization': `${this.token}`,
        'content-type': 'application/json'
      })
    }
  }

  getAll() {
    return this.http.get(`${this.API_URL}/list`, this.httpOptions);
  }
  getById(id: any) {
    return this.http.get(`${this.API_URL}/` + id, this.httpOptions);
  }
  update(id: any, user: FormData) {
    return this.http.put(`${this.API_URL}/update/` + id, user, this.httpOptions);
  }
  delete(id: any) {
    return this.http.delete(`${this.API_URL}/delete/` + id, this.httpOptions);
  }
  sendEmailVerifyMessage(email:any, firstName:any, verifyAfterCreate:any) {
    return this.http.post(`${this.API_URL}/email/send/verify`, {
      email,
      firstName,
      verifyAfterCreate
    }, this.httpOptions);
  }

}
