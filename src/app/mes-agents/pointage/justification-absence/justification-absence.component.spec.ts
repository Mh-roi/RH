import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustificationAbsenceComponent } from './justification-absence.component';

describe('JustificationAbsenceComponent', () => {
  let component: JustificationAbsenceComponent;
  let fixture: ComponentFixture<JustificationAbsenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JustificationAbsenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JustificationAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
