import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../_models/user';
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
        'x-authorization': `${this.token}`
      })
    }
  }

  getAll() {
    return this.http.get(`${this.API_URL}/list`, this.httpOptions);
  }
  getById(id: string) {
    return this.http.get(`${this.API_URL}/` + id, this.httpOptions);
  }
  update(id: string, user: User) {
    return this.http.put(`${this.API_URL}/update/` + id, user, this.httpOptions);
  }
  delete(id: string) {
    return this.http.delete(`${this.API_URL}/delete/` + id, this.httpOptions);
  }
}
