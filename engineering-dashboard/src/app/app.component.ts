import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { AppConfiguration } from "@app/config/app-configuration";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  constructor(
    private titlePage: Title,
    private appConfiguration: AppConfiguration
  ) {}
  ngOnInit() {
    this.titlePage.setTitle(
      this.appConfiguration.title + " " + this.appConfiguration.version
    );
  }
}
