import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { AppConfiguration } from '@app/config/app-configuration';
import { AppRoute } from '@app/enums/app-enums';

import { User } from '@app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @HostBinding('class.site-header') true;

 
  constructor(private appConfiguration: AppConfiguration) {
  }

  title = this.appConfiguration.title;
  homeRoute = AppRoute.Login;
  user: User;

  ngOnInit() {
    this.initCurrentUser();
  }

  initCurrentUser() {
    let sUser = sessionStorage.getItem('dashboard-auth');

    this.user = JSON.parse(sessionStorage.getItem('dashboard-auth'));
  }

  toggleSearch = function ($event: Event) {
    $event.preventDefault();

    if (this.searchActive) {
      this.searchActive = false;

      setTimeout(() => {
        this.searchLink.nativeElement.focus();
      }, 0);
    } else {
      this.searchActive = true;

      setTimeout(() => {
        this.searchInput.nativeElement.focus();
      }, 0);
    }
  };
}
