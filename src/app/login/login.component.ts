import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login-service';
import { User } from '../models/user';
import { RouterLink, Router } from '@angular/router';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
PNotify.defaults.styling = 'bootstrap3'; // Bootstrap version 3
PNotify.defaults.icons = 'bootstrap3'; // glyphicons
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  cookieValue = 'UNKNOWN';
  
  private user: User;
  constructor(private loginService: LoginService, private router: Router,private cookieService: CookieService) { }

  ngOnInit() {
    PNotifyButtons; // Initiate the module. Important!
  }

  login(form: NgForm) {
    console.log("form waardes naam", form.value.name);
    console.log("form waardes pass", form.value.password);
    this.loginService.postLogin(form.value.name, form.value.password).subscribe((data: User) => {
      this.user = data;

      try {
        console.log("opgehaalde data", this.user);
        console.log(this.user.name);
        console.log(this.user.id);
        this.cookieService.set( 'Username', this.user.name );
        this.cookieService.set('UserId',this.user.id.toString());
        this.cookieService.set( 'LoggedIn', 'true' );
        this.loginService.broadcastLoginChange(this.user.name,this.user.id);
        this.loginService.broadcastLoginChangeStatus(true);
        this.router.navigate(['serie/'+this.user.id]);
        PNotify.closeAll();
      } catch (error) {
        console.error(error);
        var notice = PNotify.error({
          title: 'Oh No!',
          text: 'Incorrect login credentials, try again.',
          modules: {
            Buttons: {
              closer: false,
              sticker: false
            }
          }
        });
        notice.on('click', function() {
          notice.close();
        });
      }

    });
  }

  logout() {
    console.log("logout() login component");
    this.cookieService.deleteAll();
    this.user = new User();
    this.cookieService.set( 'LoggedIn', 'false' );
    this.loginService.broadcastLoginChange(this.user.name,this.user.id);
    console.log("test",this.user.name);
    this.loginService.broadcastLoginChangeStatus(false);
    
    this.router.navigate(['login'])
    PNotify.closeAll();

  }
}
