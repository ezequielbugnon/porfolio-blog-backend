import { Routes } from "@angular/router";
import { EditComponent } from './panel/edit/edit.component';
import { CrearComponent } from './panel/crear/crear.component';
import { ImageComponent } from './panel/image/image.component';
import { ProjectsComponent } from './projects/projects.component';
import { EditaProComponent } from './projects/edita-pro/edita-pro.component';
import { ImageProComponent } from './projects/image-pro/image-pro.component';
import { DeleteproComponent } from './projects/deletepro/deletepro.component';

export const dashbord_routes: Routes = [
    {path: 'editar/:id', component: EditComponent},
    {path: 'crear', component: CrearComponent},
    {path: 'image/:id', component: ImageComponent},
    {path: 'projects/crear', component: ProjectsComponent},
    {path: 'projects/editar/:id', component: EditaProComponent},
    {path: 'projects/editarImage/:id', component: ImageProComponent},
    {path: 'projects/delete/:id', component: DeleteproComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'crear'}
   
]