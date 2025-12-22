import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPrivilegeComponent } from './details-privilege.component';

describe('DetailsPrivilegeComponent', () => {
  let component: DetailsPrivilegeComponent;
  let fixture: ComponentFixture<DetailsPrivilegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsPrivilegeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsPrivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
