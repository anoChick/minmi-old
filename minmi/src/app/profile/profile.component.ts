import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../services/user.service';
import { User } from '../classes/user';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import * as firebase from 'firebase';
import { environment } from './../../environments/environment';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private userDoc: AngularFirestoreDocument<User>;
  public user: Observable<User>;
  public model: User;
  userForm: FormGroup;
  public uploading: boolean = false;


  constructor(private fb: FormBuilder,private afs: AngularFirestore, public db: AngularFirestore, public afAuth: AngularFireAuth, public userService: UserService) {
    this.createForm();
    this.afAuth.authState.subscribe(user => {
      if(!user){return};



      this.userDoc = afs.doc<User>('users/'+user.uid);
      this.user = this.userDoc.valueChanges();
      this.user.subscribe(user => {
        this.userForm.patchValue({
          displayName: user.displayName,
          photoURL: user.photoURL
        });
        this.model = user as User;
      });
    });
  }
  ngOnInit() {
  }

  onSubmit(){
    this.userDoc.update({
      displayName: this.userForm.controls.displayName.value,
      photoURL: this.userForm.controls.photoURL.value
    });

  }

  createForm() {
    this.userForm = this.fb.group({ // <-- the parent FormGroup
        displayName: ['', Validators.required ],
        photoURL: ['']
    });
  }

  onChangeInput(evt) {

    var LENGTH = 16;
    // 生成する文字列に含める文字セット
    var WORDS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var generateRandomStr = function() {
      var r = "";
      for(var i = 0; i < LENGTH; i++){
        r += WORDS[Math.floor(Math.random() * WORDS.length)];
      }
      return r;
    }

    const file = evt.target.files[0];
    var f = file.name.split('.');

    // 後々angulerfire2がstorage対応すると思うのでそのときに書き直そう。
    const storageRef = firebase.storage().ref(`upload_files/${firebase.auth().currentUser.uid}/${generateRandomStr()}.${f[f.length-1].toLowerCase()}`);
    this.uploading = true;
    var self = this;
    storageRef.put(file).then(result => {
      this.userForm.patchValue({
        photoURL: result.downloadURL
      });
      self.uploading = false;

    })
    .catch(err => {
      console.log(err);
      self.uploading = false;
    });
  }
}
