import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGridPageComponent } from './data-grid-page.component';

describe('DataGridPageComponent', () => {
  let component: DataGridPageComponent;
  let fixture: ComponentFixture<DataGridPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataGridPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataGridPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
