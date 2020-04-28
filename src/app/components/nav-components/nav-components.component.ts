import { Component, OnInit, DoCheck, Output } from '@angular/core';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-nav-components',
  templateUrl: './nav-components.component.html',
  styleUrls: ['./nav-components.component.css']
})
export class NavComponentsComponent implements OnInit, DoCheck {
      active: Boolean;
      private identity;
      private token;
     

  constructor(
    private _userService: UserService,
  ){
    this.loadUser();
  }
  
  ngOnInit() {
    
  }

  animatNavbar(){
    if(!this.active){
     this.active = true; 
   
    }else{
      this.active = false; 
    }

    
  }

  ngDoCheck(){
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    
  }


}
