import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliothequeArreteComponent } from './bibliotheque-arrete.component';

describe('BibliothequeArreteComponent', () => {
  let component: BibliothequeArreteComponent;
  let fixture: ComponentFixture<BibliothequeArreteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BibliothequeArreteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BibliothequeArreteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
