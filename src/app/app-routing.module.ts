import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {path:'',
    loadComponent:()=>import('./layOut/default-layout/default-layout.component').then((m)=>m.DefaultLayoutComponent),
    children:[
      {path:'',redirectTo:'home',pathMatch:'full'},
      {path:'home',loadComponent:()=>import('./Components/home/home.component').then((m)=>m.HomeComponent),title:'Home'},
      {path:'products',loadComponent:()=>import('./Components/products/products.component').then((m)=>m.ProductsComponent),title:'Products'},
      {path:'edit/:id',loadComponent:()=>import('./Components/edit/edit.component').then((m)=>m.EditComponent),title:'edit'},
      {path:'login',loadComponent:()=>import('./Components/login/login.component').then((m)=>m.LoginComponent),title:'Login'},
    ]
  },
  {path:'**',loadComponent:()=>import('./Components/not-found/not-found.component').then((m)=>m.NotFoundComponent)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
