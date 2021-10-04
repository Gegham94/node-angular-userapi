import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from "@angular/forms";

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  API_URL = environment.API_URL;
  httpOptions: any;
  form: FormGroup;
  formData: any;
  token:any;

  constructor(private http: HttpClient, public fb: FormBuilder) { 
    this.token = localStorage.getItem('access_token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'x-authorization': `${this.token}`,
        'content-type': 'application/json'
      })
    }

    this.form = this.fb.group({
      title: [''],
      document: ['']
    });
  }

  getAll() {
    return this.http.get(`${this.API_URL}/projects-api/list`, this.httpOptions);
  }
  getById(id: any) {
    return this.http.get(`${this.API_URL}/projects-api/${id}`, this.httpOptions);
  }
  update(id: any, project: FormData) {
    return this.http.put(`${this.API_URL}/projects-api/update/${id}`, project, this.httpOptions);
  }
  delete(id: any) {
    return this.http.delete(`${this.API_URL}/projects-api/delete/${id}`, this.httpOptions);
  }
  create(){
    this.formData = new FormData();
    this.formData.append("title", this.form.get('title')?.value);
    this.formData.append("document", this.form.get('document')?.value);
    return this.http.post(`${this.API_URL}/projects-api/create`, this.formData, this.httpOptions);
  }

}
