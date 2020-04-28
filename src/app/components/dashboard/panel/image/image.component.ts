import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  
  private file: File;
  private photoSelected: string | ArrayBuffer;
  private token: string;
  private id: string;
  private entrada :string;
  private imagen: string;
  private ventana: boolean;
  private idImage: string;
  private editar: boolean;

  constructor(
     private _userService: UserService,
     private _ruter: Router,
     private _route: ActivatedRoute,
     private _blogService: BlogService
    
  ) { 
    this.token = _userService.getToken();
    this.ventana = false;
    this.editar = false;
  }

  ngOnInit() {
    this.getImagenPrint();
  }

 


  getParams(){
      this._route.params.subscribe( params => {
        this.id = params['id'];
        
      })
  }

  onFotoSelected(event: HtmlInputEvent){
      if(event.target.files && event.target.files[0]){
        this.file = <File>event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.photoSelected = reader.result;
        reader.readAsDataURL(this.file);
      }
  }

  uploadImage(){
    
    this.getParams();
    this._blogService.subirFoto(this.id, this.file, this.token).subscribe( 
      response => {

          console.log(response);
      },
      error => {
        console.log(<any>error)
      }
    )
  }

  getImagenPrint(){
      this.getParams();
      let id = this.id;
      this._blogService.getOne(id).subscribe( response => {
        this.entrada = response.entrada;
        this.imagen = response.entrada.image;
        console.log(this.imagen)
        
        
      },error => {
          console.log(<any>error)
      });
  }

  deleteImage(id){
    this._blogService.deletePhoto(this.token, id).subscribe( 
      response => {
          console.log(response);
          
      },
      error => {
        console.log(error);
      }
    )
    this.ventana = false;
  }

 


}
