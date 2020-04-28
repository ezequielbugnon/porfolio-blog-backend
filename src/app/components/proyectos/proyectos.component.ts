import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  private projects: Object;
  constructor(
      private _servicePro: ProjectsService
  ) { }

  ngOnInit() {
    this.get();
  }

  get(){
    this._servicePro.getProjects().subscribe(
      response =>{
          this.projects = response;
         
      },
      error => {
        console.log(error)
      }
    )
  }

}
