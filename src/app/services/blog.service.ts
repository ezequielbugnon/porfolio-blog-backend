import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './gobal';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private url: string;

  constructor(private http: HttpClient) { 
      this.url = GLOBAL.url;
  }


  getBlog():Observable<any>{
     return this.http.get(this.url+'entrada');
  }

  input(entrada, token):Observable<any>{
      
      let json = JSON.stringify(entrada);
      let headers = new HttpHeaders().set('Content-Type','application/json').set('x-access-token',token);
      return this.http.post(this.url+'entrada', json, {headers:headers});                     
  }

  getOne(id): Observable<any>{
      return this.http.get(this.url+'entrada/'+ id);
  }

  edit(id, token , body): Observable<any>{
     let json = JSON.stringify(body);
     let headers = new HttpHeaders().set('Content-Type','application/json').set('x-access-token',token);
     return this.http.put(this.url+'entrada/edit/'+ id, json, {headers:headers});
  }

  borrar(id, token): Observable<any>{
    let headers = new HttpHeaders().set('x-access-token', token);
    return this.http.delete(this.url+'entrada/delete/'+id, {headers:headers});
  }

  subirFoto(id: string, imagen: File, token: string): Observable<any>{
    
    let headers = new HttpHeaders().set('x-access-token', token).set('entrada', id );
    const fd = new FormData();

    fd.append('image', imagen);
 
    return this.http.post(this.url+'project/image/', fd, {headers:headers});
  }

  deletePhoto(token, id):Observable<any>{
    let headers = new HttpHeaders().set('x-access-token', token);
    return this.http.delete(this.url+'project/image/delete/'+id,{headers:headers});
  }

 

}
