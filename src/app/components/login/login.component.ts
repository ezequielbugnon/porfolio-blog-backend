import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/clases/user';
import { Router, ActivatedRoute, Params} from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public page_titulo: string;
  public user: User;
  private param :string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.user = new User("","", "", "", "");
  }

  ngOnInit() {
   this.logout();

  }

  onSubmit(form){
    this._userService.Login(this.user).subscribe(
      response => {
          console.log(this.user);
        if(response.token && response.auth){
          localStorage.setItem('token', JSON.stringify(response.token));
          this._userService.me(response.token).subscribe(
            response => {
              
              localStorage.setItem('identity', JSON.stringify(response));
              this._router.navigateByUrl('dashboard');
              
            },
            error =>{
              console.log(<any>error);
            }
            
          );
        }
      }, error => {
        console.log(<any>error);
       
      }
    );
     form.reset();
  }

  logout(){
    this._route.params.subscribe( params =>{
      let logout = +params['sure'];
       if(logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        
        this._router.navigateByUrl('/home');
       }
      });
  
  }

  registerRedirect(){
    this._router.navigate(['/register']);
  }
}
