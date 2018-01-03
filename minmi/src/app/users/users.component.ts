import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.users = db.collection('users').valueChanges();
  }

  ngOnInit() {
  }

}
