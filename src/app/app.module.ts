import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LoaderInterceptor } from './Core/Interceptors/loader.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { LoaderComponent } from './Components/loader/loader.component';
import { TokenInterceptor } from './Core/Interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LoaderComponent,
    ToastrModule.forRoot()
],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:LoaderInterceptor,
      multi:true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
