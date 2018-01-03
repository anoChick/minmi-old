import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute, Router } from '@angular/router';

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
  currentChannelPostSize = 0;
  types = [
    {
      actionLabel:'記事を書く',
      path:"/posts/new"
    },{
      actionLabel:'まとめを作る',
      path:"/"
    }
  ];
  type = 0;
  tabs = [
    {
      active: true,
      name  : 'ストリーム',
      icon  : 'anticon anticon-flag'
    },
    {
      active: false,
      name  : 'まとめ',
      icon  : 'anticon anticon-book'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public db: AngularFirestore) {
    // this.route.queryParams.subscribe(params => {
    //   this.selectChannelById(params['channel_id']);
    // });


    var self = this;
    this.channels = db.collection('channels', ref => ref.orderBy("createdAt", "desc")).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        if(data.name=="全体"){
          self.selectChannelById(id);
        }
        return { id, ...data };
      });
    });
  }

  ngOnInit() {
  }
  public selectChannelById(channelID){
    this.currentChannelID = channelID;
    this.currentChannelPostSize = 0;
    this.currentChannelPosts = this.db.collection('posts', ref => ref.where('channelID', '==', channelID).orderBy("createdAt", "desc")).snapshotChanges().map(actions => {
      return actions.map(action => {
        this.currentChannelPostSize +=1;
        return { id: action.payload.doc.id, ...action.payload.doc.data() };
      });
    });
  }

  selectChannel(channel){
    this.selectChannelById(channel.id)
  }

  selectType(tab){
    this.type = tab.index;
  }

}
