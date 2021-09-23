import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

import { UsersService } from '../../services/users.service';
import { User } from '../../_models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  resData: User[] = [];
  displayedColumns: string[] = ['image', 'firstName', 'lastName', 'possition', 'gender', 'dateOfBirth'];
  dataSource!: MatTableDataSource<User>;

  constructor(public usersService : UsersService, private router: Router) {}

  ngOnInit(): void {
    this.usersService.getAll().subscribe((response: any) => {
      this.resData = response as User[];
      this.dataSource = new MatTableDataSource(this.resData);  
    });
  }

  clickedRows(row : any){
    this.router.navigate(['users-api/', row._id]);
  }
}
