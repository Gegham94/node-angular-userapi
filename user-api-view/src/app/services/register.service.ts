import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  httpOptions: any;

  constructor(private http: HttpClient) { 
    this.httpOptions= { Headers: new HttpHeaders({
      'content-type': 'application/json'
    })}
  }
  
  getAPIData(){
    return this.http.post('http://localhost:3000/users/create', this.httpOptions)
  }
}
