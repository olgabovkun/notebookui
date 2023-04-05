import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ContentComponent } from './partials/content/content.component';
import { ContentService } from './partials/content/content.service';
import { EditNotebookDropbownComponent } from './partials/dropdown/editnotebook/edit-notebook-dropdown.component';
import { LogoutDropbownComponent } from './partials/dropdown/logout/logout-dropdown.component';
import { FooterComponent } from './partials/footer/footer.component';
import { NotebookModalComponent } from './partials/modal/notebookform/notebook-modal.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { SidebarComponent } from './partials/sidebar/sidebar.component';
import { LoginService } from './service/api/login.service';
import { NotebookService } from './service/api/notebook.service';
import { GlobalErrorHandler } from './service/handler/error.handler';
import { TokenInterceptor } from './service/interceptor/token.interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    SidebarComponent,
    ContentComponent,
    NotebookModalComponent,
    EditNotebookDropbownComponent,
    LogoutDropbownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    NotebookService,
    ContentService,
    LoginService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
