import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardThumbnailListComponent } from './dashboard-thumbnail-list.component';

describe('DashboardThumbnailListComponent', () => {
  let component: DashboardThumbnailListComponent;
  let fixture: ComponentFixture<DashboardThumbnailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardThumbnailListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardThumbnailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
