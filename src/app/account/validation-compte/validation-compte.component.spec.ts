import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationCompteComponent } from './validation-compte.component';

describe('ValidationCompteComponent', () => {
  let component: ValidationCompteComponent;
  let fixture: ComponentFixture<ValidationCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationCompteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
