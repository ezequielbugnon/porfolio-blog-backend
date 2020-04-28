import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './gobal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private url: string;

  constructor(private http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  getProjects():Observable<any>{

    return this.http.get(this.url+'projects');
  }

  crearProjects(token, body):Observable<any>{
    let json = JSON.stringify(body);
    let headears = new HttpHeaders().set('Content-Type','application/json').set('x-access-token', token)
    return this.http.post(this.url+'projects',json, {headers:headears});
  }

  getOne(id):Observable<any>{
      return this.http.get(this.url+'project/'+id);
  }

  edit(body,id,token):Observable<any>{
      let json = JSON.stringify(body);
      let headears = new HttpHeaders().set('Content-Type','application/json').set('x-access-token', token)
      return this.http.put(this.url+'project/edit/'+ id, json, {headers: headears});
  }

  delete(id, token){
      let headears = new HttpHeaders().set('Content-Type','application/json').set('x-access-token', token)
      return this.http.delete(this.url+'project/delete/'+id, {headers: headears});
  }

  subirFoto(id: string, imagen: File, token: string): Observable<any> {

    let headers = new HttpHeaders().set('x-access-token', token).set('project', id);
    const fd = new FormData();

    fd.append('image', imagen);

    return this.http.post(this.url + 'project/image/', fd, { headers: headers });
  }



}
