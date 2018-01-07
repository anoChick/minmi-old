import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { UserService } from '../services/user.service'
import { AngularFireAuth } from 'angularfire2/auth';
import {NzMessageService} from 'ng-zorro-antd';





import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-post-edit-mini',
  templateUrl: './post-edit-mini.component.html',
  styleUrls: ['./post-edit-mini.component.css']
})
export class PostEditMiniComponent implements OnInit {
  @Input() channelID: string;
  private _el: HTMLElement;
  public uploading: boolean = false;

  postForm: FormGroup;
  constructor(
    private _message: NzMessageService,
    public userService: UserService,
    private route: ActivatedRoute,
    public afAuth: AngularFireAuth,
    private router: Router,
    public db: AngularFirestore,
    private fb: FormBuilder,
    private el: ElementRef,
    ) {
    this._el = el.nativeElement;

    var self = this;
    this.createForm();
  }

  createForm() {
    this.postForm = this.fb.group({ // <-- the parent FormGroup
        channelUID: [this.channelID, Validators.required ],
        body: ["", Validators.required ]
    });
  }

  ngOnInit() {
  }


  onSubmit(){
    var self = this;
    const collection = this.db.collection('posts');
    this.afAuth.authState.subscribe(user => {
      if(!user){return};
      collection.add({
        body: self.postForm.controls.body.value,
        ownerID:user.uid,
        channelID:self.channelID,
        channel:self.db.doc(`channels/${self.channelID}`).ref,
        owner:self.db.doc(`users/${user.uid}`).ref,
        createdAt:new Date(),
        updatedAt:new Date(),
        star:0,
      }).then(function(docRef) {
        self.postForm.controls['body'].patchValue('');
        self._message.create('success', '投稿しました');

        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        self._message.create('error', '投稿に失敗しました。');

        console.error("Error adding document: ", error);
      });
    });


  }

}
