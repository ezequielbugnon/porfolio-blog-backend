import { Component, OnInit } from '@angular/core';
import { Projets } from 'src/app/clases/projects';
import { ProjectsService } from 'src/app/services/projects.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edita-pro',
  templateUrl: './edita-pro.component.html',
  styleUrls: ['./edita-pro.component.css']
})
export class EditaProComponent implements OnInit {

  public froalaOptions: Object = {
    heightMin: 300,
    heightMax: 300,
    charCounterCount: true,
    imageUpload: true,
    
  }

  private projects: Projets;
  private token: string;
  private project: string;

  constructor(
      private _serviceProjects : ProjectsService,
      private _serviceUser: UserService,
      private router: Router,
      private route: ActivatedRoute
    )
   { 
     this.projects = new Projets("","","", "", "");
     this.token = _serviceUser.getToken();

  }

  ngOnInit() {

    this.get();
  }

  get(){
      this.route.params.subscribe(
        params =>{
          let parametros = params['id'];
          this._serviceProjects.getOne(parametros).subscribe(
            response =>{
                this.projects.title = response.title;
                this.projects.id = response._id;
                this.projects.content = response.content;
                this.projects.url = response.url
            
            },
            error => {
              console.log(error)
            }
            
          )
        },
        error =>{
          console.log(error)
        }
      )
  }

  onSubmit(form){
    
    this.route.params.subscribe(
      params =>{
        let parametros = params['id'];
        this._serviceProjects.edit(this.projects, parametros,this.token).subscribe(
          response => {
            console.log(response)
          },
          error => {
            console.log(error)
          }
          
        )
      },
      error =>{

      }
    )
    
    form.reset();
  }

}
