import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifierRapportComponent } from './certifier-rapport.component';

describe('CertifierRapportComponent', () => {
  let component: CertifierRapportComponent;
  let fixture: ComponentFixture<CertifierRapportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertifierRapportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertifierRapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
