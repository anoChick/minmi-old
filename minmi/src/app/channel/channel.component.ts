import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  channels: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.channels = db.collection('channels').valueChanges();
  }
  ngOnInit() {
  }

}
