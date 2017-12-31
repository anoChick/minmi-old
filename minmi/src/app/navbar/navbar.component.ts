import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../services/user.service';
import { User } from '../classes/user';

import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase/app';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items: Array<Object> = [
    {title:"Posts",path:"/aaa"},
    {title:"ログイン",path:"/login"},
    {title:"グループ",path:"/groups"},
    {title:"ユーザ一覧",path:"/users"},
    {title:"プロフィール",path:"/profile"},

  ];
  constructor(public afAuth: AngularFireAuth, public userService: UserService) {
  }

  ngOnInit() {
  }


  logout() {
    this.afAuth.auth.signOut();
    location.href='/';
  }
}
