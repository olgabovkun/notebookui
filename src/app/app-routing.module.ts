import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PageNotFoundComponent } from './partials/notfound/page-not-found.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home/note/:id', component: HomeComponent },
  { path: '**', redirectTo: 'not-found' },
  {
    path: 'not-found',
    data: { title: '404' },
    children: [
      {
        path: '',
        component: PageNotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
