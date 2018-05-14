import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import { MOCKSUSERS } from '../mock-users';
import { Http, Headers} from '@angular/http';
import { HttpModule } from '@angular/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;
  mockusers = MOCKSUSERS;
  realusers: Array<Object>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: Http
  ) {
    http.get('http://127.0.0.1:8080/users/list')
                      .subscribe(realusers => this.realusers = realusers.json());
   }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile=> {
      this.user = profile.user;
      console.log(this.user);
    },
    err => {
      //console.log(err);
      return false;
    });
  }

}
