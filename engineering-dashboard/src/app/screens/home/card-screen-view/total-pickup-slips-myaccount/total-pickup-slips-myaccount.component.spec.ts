/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TotalPickupSlipsMyaccountComponent } from './total-pickup-slips-myaccount.component';

describe('TotalPickupSlipsMyaccountComponent', () => {
  let component: TotalPickupSlipsMyaccountComponent;
  let fixture: ComponentFixture<TotalPickupSlipsMyaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalPickupSlipsMyaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPickupSlipsMyaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
