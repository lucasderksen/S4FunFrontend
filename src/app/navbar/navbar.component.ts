import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search/search.service';
import { LoginService } from '../services/login-service';
import { LoginComponent } from '../login/login.component';


@Component({
  providers: [LoginComponent],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private searchService: SearchService, public loginService: LoginService, private loginComponent: LoginComponent) { }

  private name: any;
  private id: any;
  loggedIn: boolean = false;

  ngOnInit() {
    console.log("loggedIn", this.loggedIn);
    this.loginService.name.subscribe((val) => {
      this.name = val;
      if (val) {
        this.loggedIn = true;
        console.log("name1",this.name)
      } else if(this.loginService.CurrentName) {
        this.loggedIn = true;
        console.log("name2",this.name)
      }
      else {
        this.loggedIn = false;
        console.log("name3",this.name)
      }
      console.log("loggedIn", this.loggedIn);

    });
    this.loginService.id.subscribe(((val) => {
      this.id = val;
    }));
  }

  searchSubmit(searchTitle) {

    console.log(searchTitle.value.searchText);
    console.log(this.searchService.getSeriesByName(searchTitle.value.searchText));
    this.router.navigate(['search/' + searchTitle.value.searchText]);
  }


  logout() {
    this.loginComponent.logout();
  }

  serieRouter(){
    this.router.navigate(['serie/'+this.id])
  }

  

}
