import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouteStateSnapshot } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private route: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouteStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            return true;
        }
        this.route.navigate(['/login'], { queryparams: { returnurl: state.url } });
        return false;
    }
}