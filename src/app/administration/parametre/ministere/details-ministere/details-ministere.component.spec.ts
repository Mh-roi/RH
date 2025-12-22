import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMinistereComponent } from './details-ministere.component';

describe('DetailsMinistereComponent', () => {
  let component: DetailsMinistereComponent;
  let fixture: ComponentFixture<DetailsMinistereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsMinistereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsMinistereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
