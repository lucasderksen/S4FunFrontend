import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { SerieListComponent } from './serie-list/serie-list.component';
import { SerieComponent } from './serie/serie.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccountComponent } from './account/account.component';
import { CountdownComponent } from './countdown/countdown.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SearchDetailsComponent } from './search-details/search-details.component';
import { LoginService } from './services/login-service';
import { RegisterComponent } from './register/register.component';
import { ShowService } from './services/show-service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SerieListComponent,
    SerieComponent,
    NavbarComponent,
    AccountComponent,
    CountdownComponent,
    SearchComponent,
    SearchDetailsComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [LoginService,ShowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
