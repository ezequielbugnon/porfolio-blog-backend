import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-showid',
  templateUrl: './showid.component.html',
  styleUrls: ['./showid.component.css']
})
export class ShowidComponent implements OnInit {

  private projects: Array<any>;
  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    private _servicePro: ProjectsService
  ) { }

  ngOnInit() {
    this.get();
  }

  get(){
    this._route.params.subscribe(
      params => {
        let parametros = params['id']
         this._servicePro.getOne(parametros).subscribe(
           response => {
              this.projects = response;
              this.projects = Array.of(this.projects)
              
           },
           error => {
             console.log(error)
           }
          
         )
      },
      error => {
        console.log(error)
      }
    )
  }



}
