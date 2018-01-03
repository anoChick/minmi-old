import { Component, OnInit, ElementRef } from '@angular/core';
import { Post }    from '../classes/post';
import * as firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  private _el: HTMLElement;
  public uploading: boolean = false;

  postForm: FormGroup;

  channels: Observable<any[]>;
  constructor(private route: ActivatedRoute, public router: Router, private fb: FormBuilder,public db: AngularFirestore, el: ElementRef, public afAuth: AngularFireAuth) {
    var self = this;
    this.createForm();
    const queryParams = this.route.snapshot.queryParams;
    self.postForm.controls['channelUID'].patchValue(queryParams['channel_id']);

    this.channels = db.collection('channels').snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        if(data.name == "全体" && !self.postForm.controls['channelUID'].value){
          self.postForm.controls['channelUID'].patchValue(id);
        }
        return { id, ...data };
      });
    });
    this._el = el.nativeElement;

  }

  createForm() {
    this.postForm = this.fb.group({ // <-- the parent FormGroup
        channelUID: [null, Validators.required ],
        body: ["# タイトル \n\n 内容", Validators.required ]
    });
  }

  ngOnInit() {
    var selfComponent = this;

    var editor = this._el.querySelector('.editor');
    var channelSelector = this._el.querySelector('.channels');
    // $(channelSelector).dropdown();
    //ブラウザデフォルトのドラッグ＆ドロップ機能を無効化
    document.addEventListener('dragover',function(event){
      event.preventDefault();
    }, false);
    document.addEventListener('drop',function(event){
      event.preventDefault();
    }, false);

    editor.addEventListener('dragover', function(){
      this.style.boxShadow = "0px 0px 4px #0af";
    }, false);
    editor.addEventListener('dragleave',function(){
      this.style.boxShadow = "";

    }, false);



    editor.addEventListener('drop', function(event : CustomEvent & { dataTransfer?: DataTransfer }){

      //DataTransfer オブジェクト、ファイルリストを取得する
      var files = event.dataTransfer.files;
      if(!files) { return; }
      for(var i = 0; i < files.length;i++){
        //ファイルを取得する
        if (!files[i].type.match('image.*')) {
          alert('画像をアップしてください');
          return;
        }
      }
      const file = files[0];

      var textarea = editor.querySelector('textarea');
      var sentence = textarea.value;
      var len      = sentence.length;
      var pos      = textarea.selectionStart;
      var before   = sentence.substr(0, pos);
      var word     = `![アップロード中 ${file.name}...]()`;
      var after    = sentence.substr(pos, len);
      sentence = before + word + after;
      textarea.value = sentence;



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

      var f = file.name.split('.');

      // 後々angulerfire2がstorage対応すると思うのでそのときに書き直そう。
      const storageRef = firebase.storage().ref(`upload_files/${firebase.auth().currentUser.uid}/${generateRandomStr()}.${f[f.length-1].toLowerCase()}`);
      selfComponent.uploading = true;
      var self = this;
      storageRef.put(file).then(result => {
        var sentence = textarea.value;
        selfComponent.postForm.controls['body'].patchValue(sentence.replace(word,`![${file.name}](${result.downloadURL})`));
        selfComponent.uploading = false;

      })
      .catch(err => {
        console.log(err);
        selfComponent.uploading = false;
      });

    }, false);

  }


  onSubmit(){
    var self = this;
    var channelID = self.postForm.controls.channelUID.value || '未分類';
    this.afAuth.authState.subscribe(user => {
      if(!user){return};
      const collection = self.db.collection('posts');
      collection.add({
        body: self.postForm.controls.body.value,
        ownerID:user.uid,
        channelID:channelID,
        channel:self.db.doc(`channels/${channelID}`).ref,
        owner:self.db.doc(`users/${user.uid}`).ref,
        createdAt:new Date(),
        updatedAt:new Date(),
        star:0,
      }).then(function(docRef) {
        self.router.navigate([`posts/${docRef.id}`]);
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    });

  }

}
