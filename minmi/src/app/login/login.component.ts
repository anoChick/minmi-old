import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../classes/user';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  loading = false;
  private userDoc: AngularFirestoreDocument<User>;
  public currentUser: Observable<User>;
  constructor(private afs: AngularFirestore, public userService: UserService, public afAuth: AngularFireAuth) {
    console.log(this.afAuth.authState);

    this.afAuth.authState.subscribe(authUser => {
        if(!authUser){return};
      this.userDoc = afs.doc<User>('users/'+authUser.uid);
      this.userDoc.valueChanges().subscribe(user => {
        this.loading = false;
      });
    });


  }

  ngOnInit() {
  }
  login() {
    this.loading = true;
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
