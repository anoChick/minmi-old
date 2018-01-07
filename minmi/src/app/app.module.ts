import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { MarkdownModule } from 'ngx-md';

import { NgZorroAntdModule, NzUtilModule } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { UserService } from './services/user.service'

import { environment } from '../environments/environment';
import { routing, appRoutingProviders } from './app.routes';
import { TopComponent } from './top/top.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostsNewComponent } from './posts-new/posts-new.component';
import { PostComponent } from './post/post.component';
import { PostsEditComponent } from './posts-edit/posts-edit.component';
import { PostFormComponent } from './post-form/post-form.component';
import { GroupsComponent } from './groups/groups.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { ChannelComponent } from './channel/channel.component';
import { ChannelsComponent } from './channels/channels.component';
import { PostSegmentComponent } from './post-segment/post-segment.component';
import { ChannelNewComponent } from './channel-new/channel-new.component';
import { LoadingComponent } from './loading/loading.component';
import { DateTimePipe } from './pipe/date-time.pipe';
import { PostEditMiniComponent } from './post-edit-mini/post-edit-mini.component';
import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';
import { EmojiPageComponent } from './emoji-page/emoji-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    TopComponent,
    PageNotFoundComponent,
    PostsNewComponent,
    PostComponent,
    PostsEditComponent,
    PostFormComponent,
    GroupsComponent,
    UsersComponent,
    ProfileComponent,
    ChannelComponent,
    ChannelsComponent,
    PostSegmentComponent,
    ChannelNewComponent,
    LoadingComponent,
    DateTimePipe,
    PostEditMiniComponent,
    MarkdownEditorComponent,
    EmojiPageComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MarkdownModule.forRoot(),
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    NzUtilModule
  ],
  providers: [
    appRoutingProviders,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
