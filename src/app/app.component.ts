import { Component, DoCheck , OnInit} from '@angular/core';
import { NavComponentsComponent } from './components/nav-components/nav-components.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck, OnInit{
  title = 'angular-porfolio';
  private identity;
  private token;

  constructor(
    private _userService: UserService,
  ){
    this.loadUser();
  }

  ngOnInit(){
    console.log('works');
  }

  ngDoCheck(){
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    
  }

}
