import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.groups = db.collection('groups').valueChanges();
  }
  ngOnInit() {
  }

}
