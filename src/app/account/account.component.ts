import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login-service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private loginService: LoginService,private router: Router) { }
  private user: any;

  ngOnInit() {
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
    });

    // // window.location.reload();
  }


}
