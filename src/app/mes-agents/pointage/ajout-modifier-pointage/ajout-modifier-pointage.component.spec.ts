import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutModifierPointageComponent } from './ajout-modifier-pointage.component';

describe('AjoutModifierPointageComponent', () => {
  let component: AjoutModifierPointageComponent;
  let fixture: ComponentFixture<AjoutModifierPointageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutModifierPointageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutModifierPointageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
