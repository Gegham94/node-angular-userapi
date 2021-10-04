import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-createProject',
  templateUrl: './createProject.component.html',
  styleUrls: ['./createProject.component.css']
})
export class CreateProjectComponent implements OnInit {

  constructor(public projectsService : ProjectsService, private router: Router) { }

  ngOnInit(): void {
    this.projectsService.form.reset();
  }

  submitForm(){
    this.projectsService.create().subscribe((response: any)=>{
      if(response.status == 'fail') return console.log(response.message);
      
      this.router.navigate(['projects-api/list']);
      this.projectsService.form.reset();

    }, (error) => {
        console.log('error is ', error)
    });
  }

}
