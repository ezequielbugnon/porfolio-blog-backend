import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponentsComponent } from './components/nav-components/nav-components.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ɵNgClassR2Impl } from '@angular/common';


import { FormsModule }   from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BlogComponent } from './components/blog/blog.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { ImagenesComponent } from './components/imagenes/imagenes.component';
import { EditComponent } from './components/dashboard/panel/edit/edit.component';
import { CrearComponent } from './components/dashboard/panel/crear/crear.component';
import { ImageComponent } from './components/dashboard/panel/image/image.component';
import { ProjectsComponent } from './components/dashboard/projects/projects.component';
import { EditaProComponent } from './components/dashboard/projects/edita-pro/edita-pro.component';
import { ImageProComponent } from './components/dashboard/projects/image-pro/image-pro.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { DeleteproComponent } from './components/dashboard/projects/deletepro/deletepro.component';
import { ShowidComponent } from './components/proyectos/showid/showid.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponentsComponent,
    LoginComponent,
    HomeComponent,
    PagenotfoundComponent,
    RegisterComponent,
    DashboardComponent,
    BlogComponent,
    ImagenesComponent,
    EditComponent,
    CrearComponent,
    ImageComponent,
    ProjectsComponent,
    EditaProComponent,
    ImageProComponent,
    ProyectosComponent,
    DeleteproComponent,
    ShowidComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    AngularFileUploaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
