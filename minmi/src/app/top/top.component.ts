import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {
  channels: Observable<any[]>;
  currentChannelPosts: Observable<any[]>;
  currentChannelID;
  constructor(public db: AngularFirestore) {
    var self = this;
    this.channels = db.collection('channels').snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        if(data.name=="全体"){
          self.currentChannelID = id;
          self.selectChannelById(id);
        }
        return { id, ...data };
      });
    });
  }

  ngOnInit() {
  }
  selectChannelById(channelID){
    this.currentChannelPosts = this.db.collection('posts', ref => ref.where('channelID', '==', channelID)).snapshotChanges().map(actions => {
      return actions.map(a => {
        return a.payload.doc.ref.path;
      });
    });
  }

  selectChannel(channel){
    this.currentChannelID = channel.id
    this.currentChannelPosts = this.db.collection('posts', ref => ref.where('channelID', '==', channel.id)).snapshotChanges().map(actions => {
      return actions.map(a => {
        return a.payload.doc.ref.path;
      });
    });
  }

}
