import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SerieComponent } from './serie/serie.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { SearchDetailsComponent } from './search-details/search-details.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {path: 'serie/:id', component: SerieComponent},
  {path: 'search/:title', component: SearchComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'account', component: AccountComponent},
  {path: 'search-details/:media/:id', component: SearchDetailsComponent},
  {path: 'search-details/:media/:id/:bool', component: SearchDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
