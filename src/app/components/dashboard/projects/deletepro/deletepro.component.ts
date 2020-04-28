import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-deletepro',
  templateUrl: './deletepro.component.html',
  styleUrls: ['./deletepro.component.css']
})
export class DeleteproComponent implements OnInit {

  private Images: Object;
  private token: string

  constructor(
      private _router: Router,
      private _route: ActivatedRoute,
      private _servicePro: ProjectsService,
      private _blogService: BlogService,
      private userService: UserService

  ) {
     this.token = userService.getToken();
   }

  ngOnInit( ) {

      this.delete();
  }

  delete(){
      this._route.params.subscribe(
        params =>{
          let parametros = params['id'];
          this._servicePro.getOne(parametros).subscribe(
            response => {
                this.Images = response.image;
                console.log(this.Images)
            },
            error => {
              console.log(error)
            }
          )
        },
        error => {
            console.log(error);
        }
      )
  }

  eliminar(id){
      this._blogService.deletePhoto(this.token,id).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error)
        }
        
      )
  }



}
