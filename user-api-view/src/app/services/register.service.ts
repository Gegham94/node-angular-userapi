import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  httpOptions: any;
  form: FormGroup;

  constructor(private http: HttpClient, public fb: FormBuilder) { 
    this.httpOptions= { Headers: new HttpHeaders({
      'content-type': 'application/json'
    })};

    this.form = this.fb.group({
      email: [''],
      firstName: [''],
      lastName: [''],
      gender: [''],
      possition: [''],
      dateOfBirth: ['']
    });
  }
  
  submitForm(){
    var formData: any = new FormData();
    formData.append("email", this.form.get('email')?.value);
    formData.append("password", this.form.get('password')?.value);
    formData.append("firstName", this.form.get('firstName')?.value);
    formData.append("lastName", this.form.get('lastName')?.value);
    formData.append("possition", this.form.get('possition')?.value);
    formData.append("gender", this.form.get('gender')?.value);
    formData.append("dateOfBirth", this.form.get('dateOfBirth')?.value);
    return this.http.post('http://localhost:3000/users/register', formData, this.httpOptions);
  }
}
