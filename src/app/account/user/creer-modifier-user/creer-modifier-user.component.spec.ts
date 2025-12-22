import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerModifierUserComponent } from './creer-modifier-user.component';

describe('CreerModifierUserComponent', () => {
  let component: CreerModifierUserComponent;
  let fixture: ComponentFixture<CreerModifierUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerModifierUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerModifierUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
