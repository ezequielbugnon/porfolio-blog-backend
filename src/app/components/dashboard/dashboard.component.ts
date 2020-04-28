import { Component, OnInit, ViewChild, ElementRef, Renderer2,OnChanges } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service';
import { Entrada } from 'src/app/clases/entrada';
import { GLOBAL } from 'src/app/services/gobal';
import { ProjectsService } from 'src/app/services/projects.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges{

  @ViewChild("lateral", {static:true}) lateral: ElementRef; 
  @ViewChild("bloging", {static:false}) bloging: ElementRef; 
  @ViewChild("edForm", {static:false}) edForm: ElementRef; 
  @ViewChild("entraForm", {static:false}) entraForm: ElementRef; 
  @ViewChild("projects", {static:false}) projects: ElementRef; 
  private abrir: boolean;
  private ver: boolean;
 

  private identity: string;
  private token: string;
 
  private url:string;
  private id: string;
  private posts: Array<any>;
  private select: boolean;
  private editEntrada: boolean;
  private crearEntrada:boolean;
  private value: boolean;
  private project: Array<any>;
  private selectPro: string;

    

  constructor(
        private renderer: Renderer2,
        private _serviceBlog:  BlogService,
        private _serviceUser: UserService,
        private _serviceProject: ProjectsService, 
        private _router: Router,
        private _route: ActivatedRoute
    ) { 
     this.abrir= true;
     this.ver = false;
     this.identity = _serviceUser.getIdentity();
     this.token = _serviceUser.getToken();
    
     this.url = GLOBAL.url;
     this.select= false;
     
     
  }

  

  ngOnInit() {
    this.listBlog();
    this.listProject();
  }

  ngOnChanges(){
    
    this.listBlog();
  }

  headerOn(){
    if(this.abrir){
      this.renderer.addClass(this.lateral.nativeElement, "lateral");
      this.ver=true;
      this.abrir = false;
      return this.abrir, this.ver;
      
    } 
    else {
      
      this.renderer.removeClass(this.lateral.nativeElement, "lateral");
      this.ver= false;
      this.abrir = true;
      this.select = false
      return this.ver, this.abrir; 
      
    }
  }

  listBlog(){
      this._serviceBlog.getBlog().subscribe(
        response => {
          if( response.entrada){
              this.posts = response.entrada;
              
          }
          
        },
        error =>{
          console.log(error);
        }
      )
  }

  listProject(){
    this._serviceProject.getProjects().subscribe(
      response =>{
       this.project= response;
      }, 
      error =>{
        console.log(<any>error)
      }
    )
  }

  

  Onselect(value){
    if(value === true){
        if(!this.select){
          
          this.select = true;
          this.renderer.addClass(this.bloging.nativeElement, "blogSelect")
          this._router.navigateByUrl('dashboard/crear');
          
        }else{
          this.select= false;
          this.renderer.removeClass(this.bloging.nativeElement, "blogSelect")
        }
    }else{
        if(!this.select){
          
          this.select = true;
          this.renderer.addClass(this.projects.nativeElement, "blogSelect")
          this._router.navigateByUrl('dashboard/projects/crear');
        }else{
          this.select= false;
          this.renderer.removeClass(this.projects.nativeElement, "blogSelect")
        }
    }
      

  }

 selectPost: Object; 
 postId: string;

 OnlistBlog(post, id){
  
      this.selectPost = post;
      this.postId = id;
 }


 borrarEntrada(id){
   this._serviceBlog.borrar(id, this.token).subscribe( 
     response =>{
      console.log(response)
   },error =>{
      console.log(<any>error)
   })
 }

 private proId: string;
 OnlistProject(pro, id){
   this.selectPro = pro;
   this.proId = id;
 
   this._router.navigate(['dashboard/projects/editar/'+this.proId]);
 }

 deleteProject(id){
   this._serviceProject.delete(id, this.token).subscribe(
     response => {
        console.log(response);
     }, 
     error => {
       console.log(error)
     }
   )
 }



}
