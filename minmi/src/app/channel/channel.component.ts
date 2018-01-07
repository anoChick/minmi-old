import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  channels: Observable<any[]>;
  postForm: FormGroup;
  constructor(
    db: AngularFirestore,
    private fb: FormBuilder) {
    this.createForm();
    this.channels = db.collection('channels').valueChanges();
  }
  ngOnInit() {
  }
  createForm() {
    this.postForm = this.fb.group({
        body: ["aaaaa", Validators.required ]
    });
  }

  click(){
    console.log(this.postForm.controls.body.value);
  }
}
