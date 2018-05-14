import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  message = "";
  count = 5;
  name: String;
  username: String;
  email: String;
  password: String;
  description: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    //console.log(12345);
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      description: this.description
    }
    // Required Fields
    if(!this.validateService.validateRegister(user)) {
      this.message ="Please fill in all fields";
      console.log('Please fill in all fields');
      //this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
    this.message ="Please fill in use a valid email";
    console.log('Please fill in use a valid email');
    //this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
    if(data.success) {
      this.message ="You are now registered and can now login";
      console.log('You are now registered and can now login');
    //this.flashMessage.show('You are now registered and can now login', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/login']);
    } else {
      this.message ="Something went wrong";
      console.log('Something went wrong');
    //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/register']);
    }
  });

  }
}
