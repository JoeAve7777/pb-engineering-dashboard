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
export class UserService {
  constructor(
    private http: HttpClient,
    private appConfiguration: AppConfiguration
  ) {}

  getUser(email: string, password: string): Observable<any> {
    let url = this.appConfiguration.apiAuthenticate;

    url = url.replace("@email", email).replace("@password", password);

    return this.http.get<any>(url);
  }
}
