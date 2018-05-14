import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { MESSAGES } from '../mock-messages';
import { MSGS } from '../mock-messages';
import { Router } from '@angular/router';
import { Http, Headers} from '@angular/http';
import { HttpModule } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  messageAddedTitle: String;
  messageAdded: String;
  messageAddedHashtags= "";
  messageAddedHashtag: String;

  messages = MESSAGES;
  msgs = MSGS;
  realmsgs: Array<Object>;

  constructor(
    private router: Router,
    private http: Http
  ) {
    http.get('http://127.0.0.1:8080/messages/list')
                      .subscribe(realmsgs => this.realmsgs = realmsgs.json());
   }

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

  addMessage() {
    console.log(this.messageAdded);
  }

}
