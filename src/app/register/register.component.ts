import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login-service';
import { NgForm } from '@angular/forms';
import { User } from '../models/user';
import { RouterLink, Router } from '@angular/router';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
PNotify.defaults.styling = 'bootstrap3'; // Bootstrap version 3
PNotify.defaults.icons = 'bootstrap3'; // glyphicons

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( public loginService: LoginService,private router: Router) { }

  ngOnInit() {
    PNotifyButtons; // Initiate the module. Important!
  }

  register(form: NgForm){    
    this.loginService.register(form.value.name, form.value.password).subscribe((data: any) => {

      try {
        var notice = PNotify.success({
          title: 'Success!',
          text: 'You are registered, try to login now..',
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
        PNotify.closeAll();
      } catch (error) {
        console.error(error);
        var notice = PNotify.error({
          title: 'Oh No!',
          text: 'You encountered an error!',
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

}
