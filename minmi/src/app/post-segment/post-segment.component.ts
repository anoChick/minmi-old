import { Input,Output, Component, OnInit,EventEmitter } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Post } from '../classes/post';
import { NzModalService } from 'ng-zorro-antd';
import { fromDocRef } from 'angularfire2/firestore/observable/fromRef';
import { AngularFirestoreDocument } from 'angularfire2/firestore/document/document';
@Component({
  selector: 'app-post-segment',
  templateUrl: './post-segment.component.html',
  styleUrls: ['./post-segment.component.scss']
})
export class PostSegmentComponent implements OnInit {
  @Input() post;
  @Output() refresh = new EventEmitter();

  userDoc;
  user: Observable<any[]>;
  postDoc;
  constructor(private confirmServ: NzModalService, public db: AngularFirestore,public route: ActivatedRoute) {


  }

  ngOnInit() {
    var self = this;
    this.userDoc = new AngularFirestoreDocument(this.post.owner);
    this.user = self.userDoc.valueChanges();
  }
  refreshList() {
    this.refresh.emit();
  }
  deletePost(){
    var self = this;
    this.confirmServ.confirm({
      title  : '記事の削除',
      content: '記事を削除します。よろしいですか？',
      showConfirmLoading: true,
      okText: '削除する',
      cancelText: 'キャンセル',
      onOk() {
        return new Promise((resolve) => {
          self.db.doc(`posts/${self.post.id}`).delete().then(function(docRef) {
            self.refreshList()
            resolve()
          }).catch(function(error) {
            self.refreshList()
            resolve()
          });
        });
      },
      onCancel() {
      }
    });
  }

  editPost(){

  }

}
