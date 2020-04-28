import { Component, OnInit, Input } from '@angular/core';
import { Projets } from 'src/app/clases/projects';
import { ProjectsService } from 'src/app/services/projects.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  public froalaOptions: Object = {
    heightMin: 300,
    heightMax: 300,
    charCounterCount: true,
    imageUpload: true,
    
  }

  private projects: Projets;
  private token: string;

  constructor(
      private _serviceProjects : ProjectsService,
      private _serviceUser: UserService
    
    )
   { 
     this.projects = new Projets("","","", "", "");
     this.token = _serviceUser.getToken();

  }

  ngOnInit() {
  }

  onSubmit(form){
    
    this._serviceProjects.crearProjects(this.token, this.projects).subscribe(

      response =>{
        console.log(response);
      },
      error =>{
        console.log(error);
      }
    )
    form.reset();
  }

}
