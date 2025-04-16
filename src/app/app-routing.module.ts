import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {path:'',
    loadComponent:()=>import('./layOut/default-layout/default-layout.component').then((m)=>m.DefaultLayoutComponent),
    children:[
      {path:'',redirectTo:'home',pathMatch:'full'},
      {path:'home',loadComponent:()=>import('./Components/home/home.component').then((m)=>m.HomeComponent),title:'Home'},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
