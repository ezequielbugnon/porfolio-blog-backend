import { Routes } from "@angular/router";
import { ShowidComponent } from './showid/showid.component';

export const proyectos_routes: Routes = [
    { path: ':title/:id', component: ShowidComponent}
]