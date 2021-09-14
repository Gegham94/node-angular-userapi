import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

import { UsersService } from '../../services/users.service';
import { User } from '../../_models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  resData: User[] = [];
  displayedColumns: string[] = ['image', 'firstName', 'lastName', 'possition', 'gender', 'dateOfBirth'];
  dataSource!: MatTableDataSource<User>;

  constructor(public usersService : UsersService) { }

  ngOnInit(): void {
    this.usersService.getAll().subscribe((response: any) => {
      this.resData = response as User[];
      this.dataSource = new MatTableDataSource(this.resData);
    });
  }
}
