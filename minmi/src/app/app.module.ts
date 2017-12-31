import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSemanticModule } from 'ng-semantic';
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { MarkdownModule } from 'ngx-md';

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
    ProfileComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgSemanticModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MarkdownModule.forRoot()
  ],
  providers: [
    appRoutingProviders,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
