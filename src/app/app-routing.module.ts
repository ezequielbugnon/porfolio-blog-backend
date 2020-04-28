import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PagenotfoundComponent} from './components/pagenotfound/pagenotfound.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BlogComponent } from './components/blog/blog.component';
import { dashbord_routes } from './components/dashboard/dashbord.routes';
import { ProjectsComponent } from './components/dashboard/projects/projects.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { proyectos_routes } from './components/proyectos/proyectos.routes';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'logout/:sure', component:LoginComponent},
  { path: 'register', component: RegisterComponent},
  {     path: 'dashboard', 
        component: DashboardComponent,
        children: dashbord_routes

  },
  {       path: 'proyectos', 
          component: ProyectosComponent,
          children: proyectos_routes
    },
  { path: 'blog', component: BlogComponent},
  { path: '',
  redirectTo: '/home',
  pathMatch: 'full'
},
{ path: '**', component: PagenotfoundComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
