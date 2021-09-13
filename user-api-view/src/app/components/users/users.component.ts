import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public usersService : UsersService) { }

  ngOnInit(): void {}

  displayedColumns: string[] = ['firstName', 'lastName', 'possition', 'gender', 'dateOfBirth'];
  dataSource = this.usersService.getAll();

}
