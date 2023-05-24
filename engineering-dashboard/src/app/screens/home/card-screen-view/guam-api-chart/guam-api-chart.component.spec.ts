/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GuamApiChartComponent } from './guam-api-chart.component';

describe('GuamApiChartComponent', () => {
  let component: GuamApiChartComponent;
  let fixture: ComponentFixture<GuamApiChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuamApiChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuamApiChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
