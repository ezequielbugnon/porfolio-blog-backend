import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../clases/user';
import { GLOBAL } from '../services/gobal';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string;
  private identity:string;
  private token: string;
  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
   }

   Login(user):Observable<any>{
     let json = JSON.stringify(user);
     let headers = new HttpHeaders().set('Content-Type', 'application/json');
     return  this.http.post(this.url+'login', json, {headers: headers});
   }

   me(token):Observable<any>{
     let headers = new HttpHeaders().set('x-access-token', token);
     return this.http.get(this.url+'me',{headers:headers});
   }

   getIdentity(){
        return JSON.parse(localStorage.getItem('identity'));
   }

   getToken(){
        return JSON.parse(localStorage.getItem('token'));
      
   }

   logout(sure){
      if(sure){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        this.identity = null;
        this.token = null;
      }
   }

   register(user):Observable<any>{
      let json = JSON.stringify(user);
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post(this.url+'register',json, {headers:headers});
   }
}
