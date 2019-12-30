import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';

@Component({templateUrl: 'dashboard.component.html'})

export class DashboardComponent implements OnInit{

    userdata:any;
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService){}

    ngOnInit(): void {
        this.userdata = JSON.parse(localStorage.getItem('currentUser'));
    }

    logout() {
        if(this.userdata.role === 'Normal') {
            this.authenticationService.logger(this.userdata._id, 'LoggedOut').subscribe(d => {});
        }
        this.router.navigate(['/login']);  
    }
    
}