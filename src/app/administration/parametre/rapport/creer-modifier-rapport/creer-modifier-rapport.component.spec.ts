import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerModifierRapportComponent } from './creer-modifier-rapport.component';

describe('CreerModifierRapportComponent', () => {
  let component: CreerModifierRapportComponent;
  let fixture: ComponentFixture<CreerModifierRapportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerModifierRapportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerModifierRapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
