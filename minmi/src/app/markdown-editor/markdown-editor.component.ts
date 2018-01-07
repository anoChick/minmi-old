import { Component, OnInit, Input, ElementRef, forwardRef } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as firebase from 'firebase';
import { UserService } from '../services/user.service'
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.css'],
  providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MarkdownEditorComponent),
    multi: true
  }
]
})
export class MarkdownEditorComponent implements ControlValueAccessor, OnInit {

  public uploading: boolean;
  private _el: HTMLElement;


  private innerValue: any = '';

  private onTouchedCallback = () => {};
  private onChangeCallback = (_: any) => {};

  constructor(
      public userService: UserService,
      private route: ActivatedRoute,
      public afAuth: AngularFireAuth,
      private router: Router,
      public db: AngularFirestore,
      private fb: FormBuilder,
      private el: ElementRef
    ) {
    this._el = el.nativeElement;

    this.uploading = false;
  }


  get value(): any {
      return this.innerValue;
  };

  set value(v: any) {
      if (v !== this.innerValue) {
          this.innerValue = v;
          this.onChangeCallback(v);
      }
  }

  ngOnInit() {
    var selfComponent = this;
    var editor = this._el.querySelector('.editor');

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



      var f = file.name.split('.');

      // 後々angulerfire2がstorage対応すると思うのでそのときに書き直そう。
      const storageRef = firebase.storage().ref(`upload_files/${firebase.auth().currentUser.uid}/${selfComponent.generateRandomStr()}.${f[f.length-1].toLowerCase()}`);
      selfComponent.uploading = true;
      var self = this;
      storageRef.put(file).then(result => {
        var sentence = textarea.value;
        console.log(sentence.replace(word,`![${file.name}](${result.downloadURL})`));
        selfComponent.value = sentence.replace(word,`![${file.name}](${result.downloadURL})`)
        selfComponent.uploading = false;

      })
      .catch(err => {
        console.log(err);
        selfComponent.uploading = false;
      });

    }, false);
  }

  generateRandomStr(){
    var LENGTH = 16;
    var WORDS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var r = "";
    for(var i = 0; i < LENGTH; i++){
      r += WORDS[Math.floor(Math.random() * WORDS.length)];
    }
    return r;
  }

  writeValue(value: any) {
    console.log(value);
      if (value !== this.innerValue) {
          this.innerValue = value;
      }
  }
  registerOnChange(fn: any) { this.onChangeCallback = fn }
  registerOnTouched(fn: any) { this.onTouchedCallback = fn }
}
