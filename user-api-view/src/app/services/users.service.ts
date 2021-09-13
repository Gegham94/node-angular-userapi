import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersList!: User[];

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>('http://localhost:3000/users-api');
  }
  getById(id: number) {
    return this.http.get('http://localhost:3000/users-api' + id);
  }
  update(user: User) {
    return this.http.put('http://localhost:3000/users-api/update' + user.id, user);
  }
  delete(id: number) {
    return this.http.delete('http://localhost:3000/users-api/delete' + id);
  }
}
