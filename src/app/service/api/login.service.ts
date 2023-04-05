import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { catchError, tap } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    public keycloakClientId = 'notebook-app';
    public keycloakRealm = 'NotebookSpringBootKeycloak';
    public keycloakUrl = 'http://localhost:8081/';

    constructor(private http: HttpClient, private router: Router) { }

    retrieveToken(username: string, password: string) {
        let params = new URLSearchParams();
        params.append('grant_type', 'password');
        params.append('client_id', this.keycloakClientId);
        params.append('username', username);
        params.append('password', password);

        let headers =
            new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8' });
        this.http.post(this.keycloakUrl + 'realms/' + this.keycloakRealm + '/protocol/openid-connect/token',
            params.toString(), { headers: headers })
            .subscribe({
                next: data => {
                    this.saveToken(data);
                    this.router.navigate(['/home']);
                },
                error: err => alert('Invalid Credentials')
            });
    }

    saveToken(token: any) {
        this.deleteCookies();
        let expireDateAccessToken = new Date().getTime() + (1000 * token.expires_in);
        let expireDateRefreshToken = new Date().getTime() + (1000 * token.refresh_expires_in);

        Cookie.set("access_token", token.access_token, expireDateAccessToken);
        Cookie.set("refresh_token", token.refresh_token, expireDateRefreshToken);
    }

    refreshToken() {
        let params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('client_id', this.keycloakClientId);
        params.append('refresh_token', Cookie.get('refresh_token'));

        let headers =
            new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8' });

        return this.http.post(this.keycloakUrl + 'realms/' + this.keycloakRealm + '/protocol/openid-connect/token',
            params.toString(), { headers: headers })
            .pipe(
                tap(data => this.saveToken(data)),
                catchError(async (error) => {
                    alert('Invalid Credentials');
                    this.logout();
                })
            );
    }

    checkCredentials() {
        return Cookie.check('access_token');
    }

    logout() {
        this.deleteCookies();
        this.router.navigate(['/']).then(() => {
            window.location.reload();
        });
    }

    deleteCookies() {
        Cookie.delete('access_token');
        Cookie.delete('refresh_token');
    }

}