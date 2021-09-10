import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  httpOptions: any;
  form: FormGroup;
  formData: any = new FormData();

  constructor(private http: HttpClient, public fb: FormBuilder) { 
    this.httpOptions= { Headers: new HttpHeaders({
      'content-type': 'application/json'
    })};

    this.form = this.fb.group({
      email: [''],
      password: [''],
      firstName: [''],
      lastName: [''],
      gender: [''],
      possition: [''],
      dateOfBirth: [''],
      image: ['']
    });
  }

  onChangeGender(event: any) {
    this.form.get("gender")?.setValue((event.source.selected.viewValue).toLowerCase());
  }
  onChangePossition(event: any) {
    this.form.get("possition")?.setValue((event.source.selected.viewValue).toLowerCase());
  }

  submitForm(){
    this.formData.append("email", this.form.get('email')?.value);
    this.formData.append("password", this.form.get('password')?.value);
    this.formData.append("firstName", this.form.get('firstName')?.value);
    this.formData.append("lastName", this.form.get('lastName')?.value);
    this.formData.append("gender", this.form.get('gender')?.value);
    this.formData.append("possition", this.form.get('possition')?.value);
    this.formData.append("dateOfBirth", this.form.get('dateOfBirth')?.value);
    this.formData.append("image", this.form.get('image')?.value);
    
    return this.http.post('http://localhost:3000/users/create', this.formData, this.httpOptions);
  }
}
