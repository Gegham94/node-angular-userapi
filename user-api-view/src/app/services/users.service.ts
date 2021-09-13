import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>('http://localhost:3000/users');
  }
  getById(id: number) {
    return this.http.get('http://localhost:3000/users' + id);
  }
  update(user: User) {
    return this.http.put('http://localhost:3000/users/update' + user.id, user);
  }
  delete(id: number) {
    return this.http.delete('http://localhost:3000/users/delete' + id);
  }
}
