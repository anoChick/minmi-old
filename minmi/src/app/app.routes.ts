import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { PostsNewComponent } from './posts-new/posts-new.component';
import { PostsEditComponent } from './posts-edit/posts-edit.component';
import { GroupsComponent } from './groups/groups.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';

import { TopComponent } from './top/top.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'users', component: UsersComponent },
  { path: '', component: TopComponent },
  { path: 'groups', component: GroupsComponent},
  { path: 'posts/new', component: PostsNewComponent},
  { path: 'posts/:id/edit', component: PostsEditComponent},
  { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
