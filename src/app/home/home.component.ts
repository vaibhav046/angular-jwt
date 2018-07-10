import { Component, OnInit } from '@angular/core';
import { take, first } from 'rxjs/operators';

import { User } from '../models/index';
import { UserService } from '../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService) { }

    ngOnInit() {
        // get users from secure api end point
        this.userService.getAll()
            .pipe(first())
            .subscribe(user => {
                this.users = user;
            });
    }
}