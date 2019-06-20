import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login-service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
PNotify.defaults.styling = 'bootstrap3'; // Bootstrap version 3
PNotify.defaults.icons = 'bootstrap3'; // glyphicons
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private loginService: LoginService,private router: Router,private cookieService: CookieService) { }
  private user: any;

  ngOnInit() {
    PNotifyButtons; // Initiate the module. Important!

    this.loginService.getUser(this.loginService.Currentid).subscribe((user: any) => {
      this.user = user;
      console.log("user", this.user);
    }, (error) => {
      console.log(error);
    });
  }

  deleteAccount() {
    this.loginService.getUser(this.loginService.Currentid).subscribe((user: any) => {
      this.user = user;
      console.log("remove user");
      this.loginService.deleteAccount(this.user).subscribe((data: any)=>{
        var notice = PNotify.success({
          title: 'Deleted succesfully!',
          text: 'Your account has been deleted succesfully.',
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
        this.router.navigate(["login"]);
      });
    }, (error) => {
      console.log(error);
    });

  }

  update() {
    console.log(this.user);

    this.loginService.saveUser(this.user).subscribe((userdb: any) => {
      this.user = userdb;
      var notice = PNotify.success({
        title: 'Saved!',
        text: 'Your account has been updated succesfully.',
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
    });
console.log(this.user.name);
  this.user.name = this.cookieService.set( 'Username', this.user.name );

    // // window.location.reload();
  }


}
