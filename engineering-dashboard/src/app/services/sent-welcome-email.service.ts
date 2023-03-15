import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { AppConfiguration } from "../config/app-configuration";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-type": "application/json",
  }),
}; 

@Injectable({
  providedIn: "root",
})
export class SentWelcomeEmailService {
  constructor(
    private http: HttpClient,
    private appConfiguration: AppConfiguration
  ) {}

  getAll(): Observable<any> {
    let url = this.appConfiguration.apiSentWelcomeEmail;

    return this.http.get<any>(url);
  }
}
