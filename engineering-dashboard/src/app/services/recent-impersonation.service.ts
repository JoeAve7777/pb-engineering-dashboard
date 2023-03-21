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
export class RecentImpersonationService {
    constructor(private appConfiguration: AppConfiguration) {}

    getAll(): Observable<any> {
        return this.appConfiguration.RecentImpersonations;
    }

    get(): any {
        return this.appConfiguration.RecentImpersonations;
    }
}

