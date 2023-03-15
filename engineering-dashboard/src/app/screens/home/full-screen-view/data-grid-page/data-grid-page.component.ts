import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-data-grid-page',
    templateUrl: './data-grid-page.component.html',
    styleUrls: ['./data-grid-page.component.scss']
})
export class DataGridPageComponent implements OnInit {

    constructor(private router: Router,) { }

    ngOnInit(): void {
      
    }

    onGoHomeClick(): void {

        this.router.navigate(
            ['home'],
            {
                replaceUrl: true,
                skipLocationChange: true
            }
        );

    }
}
