import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliothequeCirculaireComponent } from './bibliotheque-circulaire.component';

describe('BibliothequeCirculaireComponent', () => {
  let component: BibliothequeCirculaireComponent;
  let fixture: ComponentFixture<BibliothequeCirculaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BibliothequeCirculaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BibliothequeCirculaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
