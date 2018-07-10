import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { fakeBackendProvider } from './helpers/index';

import { routing } from './app.routing';
import { AuthGuard } from './guards/index';
import { JwtInterceptor } from './helpers/index';
import { AuthenticationService, UserService } from './services/index';
import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [AuthenticationService,
    UserService, {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }, AuthGuard, fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
