import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { AppConfiguration } from "../config/app-configuration";
import { NumberFormatStyle } from "@angular/common";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-type": "application/json",
  }),
}; 

@Injectable({
  providedIn: "root",
})
export class TotalScreenService {
  constructor(
    private http: HttpClient,
    private appConfiguration: AppConfiguration
  ) {}

  get(screenId:number): Observable<any> {
    let url = "https://ttdva3cv37.execute-api.us-east-1.amazonaws.com/Prod/api/counts";

    return this.http.get<any>(url);
  }
}
