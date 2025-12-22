import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsToolbarIudComponent } from './actions-toolbar-iud.component';

describe('ActionsToolbarIudComponent', () => {
  let component: ActionsToolbarIudComponent;
  let fixture: ComponentFixture<ActionsToolbarIudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsToolbarIudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionsToolbarIudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
