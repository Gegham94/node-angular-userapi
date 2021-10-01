import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from "@angular/forms";

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  API_URL = environment.API_URL;
  httpOptions: any;
  form: FormGroup;

  constructor(private http: HttpClient, public fb: FormBuilder) { 
    this.httpOptions = { Headers: new HttpHeaders({
      'content-type': 'application/json'
    })};

    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
  }
  
  sendData() {
    return this.http.post(`${this.API_URL}/users-api/login`, {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    }, this.httpOptions);
  }
}
