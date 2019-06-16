import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';


@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private url = '';

  constructor(private http: HttpClient) { }

  
}
