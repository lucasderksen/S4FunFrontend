import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as sha512 from 'js-sha512';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class LoginService {


    Currentid: any;
    CurrentName: any;

    constructor(private http: HttpClient) { }

    private API_URL = 'http://localhost:8086/User';
    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
        'Access-Control-Max-Age': '3600',
        'Access-Control-Allow-Headers': 'x-requested-with'
    });

    deleteAccount(User: any) {
        console.log(User);
        console.log(User.id);
        return this.http.delete(`${this.API_URL}/Delete/`+User.id, { headers: this.headers });
    }

    saveUser(updatedUser: any) {
        return this.http.post(`${this.API_URL}/UpdateUser`, updatedUser, { headers: this.headers });
    }

    getUser(id) {
        return this.http.get(`${this.API_URL}/GetById/` + id, { headers: this.headers });
    }

    register(name, sha512Password) {
        sha512Password = sha512.sha512(sha512Password);
        let JsonCredentials = JSON.stringify({
            name: name,
            password: sha512Password
        });
        return this.http.post(`${this.API_URL}/Register`, JsonCredentials, { headers: this.headers });
    }

    postLogin(name: string, password: string) {

        console.log(sha512.sha512(password));
        let sha512Password = sha512.sha512(password);
        console.log("JSON", JSON.stringify({
            name: name,
            password: sha512Password,
        }));
        let JsonCredentials = JSON.stringify({
            name: name,
            password: sha512Password
        });
        console.log(JsonCredentials);
        return this.http.post(`${this.API_URL}/Login`, JsonCredentials, { headers: this.headers });
    }

    public name: Subject<string> = new Subject();
    public id: Subject<number> = new Subject();


    broadcastLoginChange(text: string, id: number) {
        console.log("name", text);
        console.log("ID", id);
        this.name.next(text);
        this.id.next(id);
        this.Currentid = id;
        this.CurrentName = text;
    }
}
