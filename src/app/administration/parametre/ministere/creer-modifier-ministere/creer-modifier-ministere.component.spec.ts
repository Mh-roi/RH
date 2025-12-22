import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerModifierMinistereComponent } from './creer-modifier-ministere.component';

describe('CreerModifierMinistereComponent', () => {
  let component: CreerModifierMinistereComponent;
  let fixture: ComponentFixture<CreerModifierMinistereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerModifierMinistereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerModifierMinistereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
