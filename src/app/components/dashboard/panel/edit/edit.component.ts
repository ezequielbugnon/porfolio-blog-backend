import { Component, OnInit, Input } from '@angular/core';
import { Entrada } from 'src/app/clases/entrada';
import { UserService } from 'src/app/services/user.service';
import { BlogService } from 'src/app/services/blog.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public froalaOptions: Object = {
    heightMin: 300,
    heightMax: 300,
    charCounterCount: true,
    imageUpload: true,
    
  }

  private entrada: Entrada;
  private token : string;

  constructor(
      private _userService: UserService,
      private _blogService: BlogService,
      private _router: Router,
      private _route: ActivatedRoute
  ) { 
    this.entrada = new Entrada("","","","");
    this.token = _userService.getToken();
  }

  ngOnInit() {
    this.paramsEntrada();
    this.entrada;
  }

  paramsEntrada(){
   
    this._route.params.subscribe( params =>{
      let postId = params['id'];
      if(postId){

        this._blogService.getOne(postId).subscribe(
          response => {
            this.entrada.title = response.entrada.title;
            this.entrada.id = response.entrada.id;
            this.entrada.content = response.entrada.content;
          

          },error => {
            console.log(<any>error);
          }
    
       )
     }
            
    })
  
  }

  onEdit(form){
    
    this._blogService.edit(this.entrada.id,this.token,this.entrada).subscribe(
      response => {
            console.log(response);
            
      },error => {
        console.log(<any>error);
      }
      
    )
    form.reset();
    
 }
        


}
