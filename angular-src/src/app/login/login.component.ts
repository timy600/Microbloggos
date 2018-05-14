import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: String;
  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }
    console.log(this.username + " - mot de passe: " +this.password);
    this.message = this.username;

    this.authService.authenticateUser(user).subscribe(data => {
      console.log(data);
      if(data.success) {
        this.authService.storeUserData(data.token, data.user);
        console.log('You are now logged in');
        this.router.navigate(['dashboard']);
      } else {
        console.log(data.msg);
        this.router.navigate(['login']);
      }
    });
  }

}
