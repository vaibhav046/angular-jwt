import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let testUser = { id: 1, username: 'test', password: 'test', firstname: 'Test', lastname: 'Test' }

        return Observable.of(null).mergeMap(() => {
            if (request.url.includes('api/authenticate') && request.method === "POST") {
                if (request.body.username === testUser.username && request.body.password === testUser.password) {
                    return Observable.of(new HttpResponse({ status: 200, body: { token: 'fake-jwt-token' } }));
                }
                else {
                    return Observable.of(new HttpResponse({ status: 400 }));
                }
            }
            if (request.url.endsWith('/api/login') && request.method === "GET") {
                if (request.headers.get("Authorization") === 'Bearer fake-jwt-token') {
                    return Observable.of(new HttpResponse({ status: 200, body: [testUser] }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }
            }
            return next.handle(request);
        })
        .materialize()
        .delay(500)
        .dematerialize();
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};