import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from '../classes/user';


@Injectable()
export class UserService {
  private userDoc: AngularFirestoreDocument<User>;
  public currentUser: Observable<User>;
  public isLoggedIn: boolean = false;

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
       if(!user){return};

      this.userDoc = afs.doc<User>('users/'+user.uid);
      this.currentUser = this.userDoc.valueChanges();
    });
  }

}
