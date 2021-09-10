import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
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
  
  submitForm() {
    return this.http.post('http://localhost:3000/users/login', {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    }, this.httpOptions);
  }
}
