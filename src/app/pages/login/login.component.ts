import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "src/app/service/api/login.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    loginForm: FormGroup;

    constructor(private loginService: LoginService) {
        this.loginForm = new FormGroup({
            login: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        });
    }

    onFormSubmit() {
        this.loginService.retrieveToken(this.loginForm.get('login')?.value as string, this.loginForm.get('password')?.value as string);
    }

    logout() {
        this.loginService.logout();
    }

}