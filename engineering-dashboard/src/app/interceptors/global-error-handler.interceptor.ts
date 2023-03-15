import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
//import { setupTestingRouterInternal } from '@angular/router/testing';

@Injectable()
export class GlobalErrorHandlerInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log("HTTP Request Started");

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMsg = this.setError(error);

        console.log(errorMsg);

        return throwError(error);
      })
    );

    return next.handle(request);
  }

  setError(error: HttpErrorResponse): string {
    let errorMsg = "Unknown error occured";

    if (error.error instanceof ErrorEvent) {
      errorMsg = error.error.message;
    } else {
      // Server side error
      if (error.status !== 0) {
        // errorMsg = error.message;
      }

      errorMsg += error.message + " - [Status Code = " + error.status + "]";
    }

    return errorMsg;
  }
}
