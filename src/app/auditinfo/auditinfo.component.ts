import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, AuthenticationService } from '../_services';
import { concat } from 'rxjs';

@Component({templateUrl: 'auditinfo.component.html'})
export class AuditinfoComponent implements OnInit {

    auditinfo: any = [];
    userdata:any;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private router: Router){}

    ngOnInit() {
        this.userdata = JSON.parse(localStorage.getItem('currentUser'));
        if(this.userdata.role === 'Auditor') {
            this.userService.getaudit().subscribe((data: any)=>{
                this.auditinfo = data;
            });
        } else {
            this.router.navigate(['/']);
        }
    }

    logout() {
        this.router.navigate(['/login']);  
    }
}
