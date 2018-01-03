import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { fromDocRef } from 'angularfire2/firestore/observable/fromRef';
import { Post } from '../classes/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  postID;

  post: Observable<Post>;
  postDoc;
  userDoc;
  user: Observable<any[]>;

  constructor(db: AngularFirestore, route: ActivatedRoute) {
    var self = this;

    this.postID = route.snapshot.params['postID'];
    this.postDoc = db.doc(`posts/${this.postID}`);
    this.post = this.postDoc.valueChanges();
    this.post.subscribe(post => {
      if(!post) return;

      self.userDoc = db.doc(`users/${post.ownerID}`);
      self.user = self.userDoc.valueChanges();
    });
  }

  ngOnInit() {
  }

}
