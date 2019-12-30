import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    
    private userdata = new BehaviorSubject<any>({});
    currentuserdata = this.userdata.asObservable();
    
    constructor(private http: HttpClient) { }

    login(username: string, password: string, role: string) {
        return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password, role })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    logger(user_id: string,type: string) {
        return this.http.post<any>(`${config.apiUrl}/users/authentication-logger`,{user_id, type});
    }

    updateuserdata(data: any) {
        this.userdata.next(data);
    }
}