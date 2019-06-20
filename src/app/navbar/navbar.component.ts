import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search/search.service';
import { LoginService } from '../services/login-service';
import { LoginComponent } from '../login/login.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  providers: [LoginComponent],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private searchService: SearchService, public loginService: LoginService, private loginComponent: LoginComponent, private cookieService: CookieService) { }

  private name: any;
  private id: any;
  private loggedIn: boolean = false;

  ngOnInit() {
    console.log("NGONINIT");

    if (this.cookieService.get('LoggedIn') == "true") {
      this.changeLoginStatus();
    }


    this.loginService.loggedIn.subscribe((val) => {
      console.log("broadcast value", val);
      console.log("cookie value", this.cookieService.get('LoggedIn'))
      if (val == true || this.cookieService.get('LoggedIn') == "true") {
        this.changeLoginStatus();
      }
    });

    this.loginService.name.subscribe((val) => { 
      console.log(val);
      this.name = val;
    });


  }

  changeLoginStatus() {
    console.log(this.cookieService.get('LoggedIn'));
    this.loggedIn = true;
    this.name = this.cookieService.get('Username');
    this.id = this.cookieService.get('UserId');
    console.log("cookie value name", this.cookieService.get('Username'));
    console.log("cookie value name", this.cookieService.get('UserId'));
    console.log("cookie value name", this.cookieService.get('LoggedIn'));
    if (this.cookieService.get('LoggedIn') == "false") {
      this.name = "";
      this.id = "";
      this.loggedIn = false;
      console.log("loggedin false");
    }
  }


  searchSubmit(searchTitle) {

    console.log(searchTitle.value.searchText);
    console.log(this.searchService.getSeriesByName(searchTitle.value.searchText));
    this.router.navigate(['search/' + searchTitle.value.searchText]);
  }


  logout() {
    this.name = "";
    this.id = "";
    this.loggedIn = false;

    this.loginComponent.logout();
  }

  serieRouter() {
    this.router.navigate(['serie/' + this.id])
  }



}
