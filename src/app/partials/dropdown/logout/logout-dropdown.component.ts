import { Component } from "@angular/core";
import { LoginService } from "src/app/service/api/login.service";

@Component({
    selector: 'app-logout-dropdown',
    templateUrl: './logout-dropdown.component.html',
    styleUrls: ['./logout-dropdown.component.css']
})
export class LogoutDropbownComponent {

    constructor(private loginService: LoginService) { }

    public logout() {
        this.loginService.logout();
    }

}