import { Component, OnInit } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
//import {URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  messageAddedTitle: String;
  messageAdded: String;
  messageAddedHashtags= "";
  messageAddedHashtag: String;

  title: String;
  username = "test8";
  content: String;
//  hashtags: Array<number>;
  hashtags = [2,6,8];

  results: Array<Object>;

  constructor(
    private http: Http,
    private router: Router) {
    http.get('http://127.0.0.1:8080/users/list')
                      .subscribe(results => this.results = results.json());
  }

  /*
  getUsers() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //let search = new URLSearchParams();
    //search.set('users', 'success');
    return this.http.get('http://127.0.0.1:8080/users/list').map(res => res.json());
    //this.http.get('http://127.0.0.1:8080/users/list', {headers: headers}).subscribe(res => res.json());
  }
  onSubmit() {
    //this.getUsers();
    this.lalist = this.results;
  }
  */

  ngOnInit() {
  }
  onAddHashtag(): void{
    if (this.messageAddedHashtag !== ""){
      if (this.messageAddedHashtags == null ){
        this.messageAddedHashtags = "#"+ this.messageAddedHashtag;
      }
      else {
        this.messageAddedHashtags = this.messageAddedHashtags + " #"+ this.messageAddedHashtag;
      }
    }
  }

  onNoHashtag(): void{
    this.messageAddedHashtags = null;
  }

  publish(messagePublished) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://127.0.0.1:8080/publish', messagePublished, {headers: headers})
      .map(res => res.json());
  }


  onAddMessage() {
    const message = {
      title: this.title,
      username: this.username,
      content: this.content,
      hashtags: this.hashtags
    }
    // Required Fields

    // Publish message
    this.publish(message).subscribe(data => {
    if(data.success) {
      //this.message ="You are now registered and can now login";
      console.log('You are now registered and can now login');
    //this.flashMessage.show('You are now registered and can now login', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/']);
    } else {
      //this.message ="Something went wrong";
      console.log('Something went wrong');
    //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/dashboard']);
    }
  });
  }

}
