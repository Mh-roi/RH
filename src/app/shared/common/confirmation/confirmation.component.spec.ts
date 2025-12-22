<<<<<<< HEAD
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
=======
import { ComponentFixture, TestBed } from '@angular/core/testing';
>>>>>>> d086df9d7dbbe6f6abdf9d24269f3bb4b981fa82

import { ConfirmationComponent } from './confirmation.component';

describe('ConfirmationComponent', () => {
  let component: ConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationComponent>;

<<<<<<< HEAD
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
=======
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationComponent ]
    })
    .compileComponents();

>>>>>>> d086df9d7dbbe6f6abdf9d24269f3bb4b981fa82
    fixture = TestBed.createComponent(ConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
