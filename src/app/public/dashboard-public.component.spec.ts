import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPublicComponent } from './dashboard-public.component';

describe('DashboardPublicComponent', () => {
  let component: DashboardPublicComponent;
  let fixture: ComponentFixture<DashboardPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPublicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
