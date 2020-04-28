import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-image-pro',
  templateUrl: './image-pro.component.html',
  styleUrls: ['./image-pro.component.css']
})
export class ImageProComponent implements OnInit {

  private file: File;
  private photoSelected: string | ArrayBuffer;
  private token : string;
  constructor(
      private _serviceUser: UserService,
      private _serviceProject: ProjectsService,
      private route: ActivatedRoute,
      private router: Router 
  ) { 

    this.token = _serviceUser.getToken();
  }

  ngOnInit() {
  }

  onFotoSelected(event: HtmlInputEvent) {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  uploadImage() {
      this.route.params.subscribe( params => {
          let parametros = params['id'];
          this._serviceProject.subirFoto(parametros, this.file,this.token).subscribe(
            response =>{
                console.log(response);
            },
            error =>{
              console.log(error)
            }
          )
      },
      error =>{
        console.log(error)
      }
      )
 
  }

}
