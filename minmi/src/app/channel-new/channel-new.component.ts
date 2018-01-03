import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
@Component({
  selector: 'app-channel-new',
  templateUrl: './channel-new.component.html',
  styleUrls: ['./channel-new.component.css']
})
export class ChannelNewComponent implements OnInit {
  channels: Observable<any[]>;
  channelForm: FormGroup;
  uploading = false;
  loading = false;
  constructor(private router:Router, private fb: FormBuilder, public db: AngularFirestore) {
    this.createForm();
    this.channels = db.collection('channels').valueChanges();
  }
  ngOnInit() {
  }
  createForm() {
    this.channelForm = this.fb.group({ // <-- the parent FormGroup
        name: ['', Validators.required ],
        description: [''],
        photoURL: [null]
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
      this.channelForm.patchValue({
        photoURL: result.downloadURL
      });
      self.uploading = false;

    })
    .catch(err => {
      console.log(err);
      self.uploading = false;
    });
  }
  onSubmit(event){
    var self = this;
    this.loading = true;
    this.db.collection('channels').add({
      name: self.channelForm.controls.name.value,
      description:self.channelForm.controls.description.value,
      photoURL:self.channelForm.controls.photoURL.value,
      createdAt:new Date(),
      updatedAt:new Date()
    }).then(function(docRef) {
      self.router.navigate([`channels/${docRef.id}`]);
      self.loading = false;

      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      self.loading = false;

      console.error("Error adding document: ", error);
    });
  }
}
