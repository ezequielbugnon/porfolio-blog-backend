import { Component, OnInit, Input } from '@angular/core';
import { Entrada } from 'src/app/clases/entrada';
import { UserService } from 'src/app/services/user.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  public froalaOptions: Object = {
    heightMin: 300,
    heightMax: 300,
    charCounterCount: true,
    imageUpload: true,
    
  }

  private entrada: Entrada;
  private token: string;


  constructor(
     private _userService: UserService,
     private _blogService: BlogService
  ) { 
    this.entrada = new Entrada("","","","");
    this.token = _userService.getToken();
  }

  ngOnInit() {
    this.entrada;

  }




  onSubmit(form){
    
     this._blogService.input(this.entrada,this.token).subscribe(
       response => {
          console.log(response);
          
          },
       error => {
            
            console.log(error);
       }
       
    )
    form.reset();
    
    }



}


