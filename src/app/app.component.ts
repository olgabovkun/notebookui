import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from './service/api/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'notebookui';
  public isLoggedIn = false;

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url.startsWith('/home')) {
          this.isLoggedIn = this.loginService.checkCredentials();
          if (!this.isLoggedIn) {
            this.router.navigate(['login']);
          }
        }
      }
    });

  }

}
