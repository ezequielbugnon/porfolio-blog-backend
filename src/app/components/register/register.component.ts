import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/clases/user';
import { UserService } from 'src/app/services/user.service';

import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  title: string = 'Registrate';
  private user:User;
  constructor(
      private _userService:UserService,
      private _ruter: Router,
      private _route: ActivatedRoute
    ) { 
    this.user = new User("", "", "", "","");
  }

  ngOnInit() {
  }

  onSubmit(form){// falta ventana emergente
    this._userService.register(this.user).subscribe( 
      response => {
          if(response.token && response.auth){
            localStorage.setItem('token', JSON.stringify(response.token));
            this._userService.me(response.token).subscribe(
              response => {
                
                localStorage.setItem('identity', JSON.stringify(response));
                this._ruter.navigateByUrl('dashboard');
                
              },
              error =>{
                console.log(<any>error);
              }
            );
          }
          else{
            console.log('error en la peticion');
          }

      },
      error => {
        console.log(<any>error);
      }
    )
    form.reset();
  }

}
