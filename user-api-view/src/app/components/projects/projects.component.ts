import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../_models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  resData: Project[] = [];
  displayedColumns: string[] = ['title', 'manager', 'developer', 'document'];
  dataSource!: MatTableDataSource<Project>;

  constructor(public projectsService : ProjectsService, private router: Router) { }

  ngOnInit(): void {
    this.projectsService.getAll().subscribe((response: any) => {
      this.resData = response as Project[];
      this.dataSource = new MatTableDataSource(this.resData);  
    });
  }
  clickedRows(row : any){
    this.router.navigate(['projects-api/', row._id]);
  }

}
