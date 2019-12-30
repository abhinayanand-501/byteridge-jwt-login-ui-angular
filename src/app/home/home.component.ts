import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    users: User[] = [];
    userdata: any;
    constructor(
        private userService: UserService,
        private router: Router,
        private authenticationService: AuthenticationService
        ) {}

    ngOnInit() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
        this.userdata = JSON.parse(localStorage.getItem('currentUser'));
    }

    logout() {
        if(this.userdata.role === 'Normal') {
            this.authenticationService.logger(this.userdata._id, 'LoggedOut').subscribe(d => {});
        }
        this.router.navigate(['/login']);  
    }
}