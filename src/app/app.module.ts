import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ContentComponent } from './partials/content/content.component';
import { ContentService } from './partials/content/content.service';
import { EditNotebookDropbownComponent } from './partials/editNotebookDropdown/edit-notebook-dropdown.component';
import { FooterComponent } from './partials/footer/footer.component';
import { NotebookModalComponent } from './partials/modal/notebookform/notebook-modal.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { SidebarComponent } from './partials/sidebar/sidebar.component';
import { NotebookService } from './service/api/notebook.service';

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
    EditNotebookDropbownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    NotebookService,
    ContentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
