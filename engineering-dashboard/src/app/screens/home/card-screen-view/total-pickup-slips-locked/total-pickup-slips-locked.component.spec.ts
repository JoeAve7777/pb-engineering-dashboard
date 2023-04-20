/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TotalPickupSlipsLockedComponent } from './total-pickup-slips-locked.component';

describe('TotalPickupSlipsLockedComponent', () => {
  let component: TotalPickupSlipsLockedComponent;
  let fixture: ComponentFixture<TotalPickupSlipsLockedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalPickupSlipsLockedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPickupSlipsLockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
