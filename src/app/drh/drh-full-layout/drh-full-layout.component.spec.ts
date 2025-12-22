import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrhFullLayoutComponent } from './drh-full-layout.component';

describe('DrhFullLayoutComponent', () => {
  let component: DrhFullLayoutComponent;
  let fixture: ComponentFixture<DrhFullLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrhFullLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrhFullLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
