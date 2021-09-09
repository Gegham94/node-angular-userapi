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
    this.httpOptions= { Headers: new HttpHeaders({
      'content-type': 'application/json'
    })};

    this.form = this.fb.group({
      name: [''],
      password: ['']
    });
  }
  
  submitForm() {
    var formData: any = new FormData();
    formData.append("email", this.form.get('name')?.value);
    formData.append("password", this.form.get('avatar')?.value);
    return this.http.post('http://localhost:3000/users/login', formData, this.httpOptions);
  
  }
}
