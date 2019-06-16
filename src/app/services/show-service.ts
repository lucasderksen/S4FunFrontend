import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import * as sha512 from 'js-sha512';
import { Subject } from 'rxjs';
import { LoginService } from './login-service';

@Injectable({
    providedIn: 'root'
})

export class ShowService {
    constructor(private http: HttpClient,private loginService: LoginService) { }

    private API_URL = 'http://localhost:8086/serie';
    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
        'Access-Control-Max-Age': '3600',
        'Access-Control-Allow-Headers': 'x-requested-with'
      });
    //   getActivitiesByCity(city: string) {
    //     return this.http.get(`${this.API_URL_LIVE}/allByCity/${city}`);
    //   }

    //   postActivity(activity: Activity) {
    //     return this.http.post(`${this.API_URL_LIVE}/add`, activity);
    //   }

    getShows(id:number) {

        console.log(id);
        return this.http.get(`${this.API_URL}/ByUserId/`+id);
    }

    postShow(show: any,id:any){
        
        console.log("SERVICE POST SHOW",show);
        console.log("body",show.overview);
        console.log("id",id);
        console.log("title",show.title);
        let Json = JSON.stringify({

            show: {
                body: show.overview, 
                title: show.title,
                poster_path: show.poster_path,
                mediaType: show.mediaType
                
            },
            tempId: id
        });
        return this.http.post(`${this.API_URL}/addShow`, Json, {headers: this.headers});
    }

    removeShow(show:any,id:any){
        console.log("removeShow showservice" ,show)
        console.log("removeShow any" ,id)

        let Json = JSON.stringify({

            show: {
                id: show.id,
                body: show.overview, 
                title: show.title,
                poster_path: show.poster_path
                
            },
            tempId: id
        });
        return this.http.post(`http://localhost:8086/serie/removeShow`, Json, {headers: this.headers}).subscribe();
    }

}
