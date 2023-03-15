import { Component, HostBinding, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { HttpErrorResponse } from "@angular/common/http";

import { Subscription } from "rxjs";
import { Router } from "@angular/router";

import { AppConfiguration } from "@app/config/app-configuration";
import { AppRoute } from "@app/enums/app-enums";
import { UserService } from "@app/services/user.service";
import { User } from "@app/models/user.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  userOb$!: Subscription;

  @HostBinding("class.signin") classSignin = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private appConfiguration: AppConfiguration
  ) {}

  title?: string = this.appConfiguration.title;
  version?: string = this.appConfiguration.version;
  errorMessage: string = null;

  ngOnInit(): void {
    this.setSessionToken("");
  }

  signinForm = this.fb.group({
    email: ["joseph.avallone@pb.com", [Validators.required, Validators.email]],
    password: ["MfI0S0VVTEyPWtDP", Validators.required],
  });

  submitted = false;
  notFound = false;

  get f() {
    return this.signinForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.signinForm.invalid) {
      return;
    } else {
      let u: User = this.signinForm.value;
      this.validateUser(u.email, u.password);
    }
  }

  validateUser(email: string, password: string) {
    document.body.style.cursor = "wait";

    this.userOb$ = this.userService
      .getUser(email.trim(), password.trim())
      .subscribe({
        next: (data) => {
          if (data.statusCode == 200 && data !== undefined && data !== null) {
            this.setSessionToken(data.body);
            this.notFound = false;

            this.router.navigate([AppRoute.HomePage]);
          } else {
            this.setSessionToken("");
            this.notFound = true;
          }
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
          if (error.status == 404) {
            this.setSessionToken("");
            this.notFound = true;
          }
        },
        complete: () => {
          document.body.style.cursor = "default";
        },
      });
  }

  ngOnDestroy(): void {
    if (this.userOb$ != null && this.userOb$ != undefined) {
      this.userOb$.unsubscribe();
    }
  }

  setSessionToken(token: string) {
    sessionStorage.setItem("dashboard-auth", token);
  }
}
