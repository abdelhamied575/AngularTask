import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,LoaderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {




  constructor(private _AuthService:AuthService,private _Router:Router,private _FormBuilder:FormBuilder,private toster:ToastrService) { }


  loginForm:FormGroup=this._FormBuilder.group({
    username:[null,[Validators.required]],
    password:[null,[Validators.required]]
  })


  handleForm():void{


    if(this.loginForm.valid){


      this._AuthService.login(this.loginForm.value).subscribe({
        next:(response)=>
        {
          
          this.toster.success('Login Successfully');
          console.log(response);
          localStorage.setItem('userToken',response.accessToken);
          this._Router.navigate(['/home']);
        },
        error:(error)=>
        {
          console.log(error);
          this.toster.error('Login Failed');
        }
      })


    }



  }



}
