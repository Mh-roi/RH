<<<<<<< HEAD
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
=======
import { ComponentFixture, TestBed } from '@angular/core/testing';
>>>>>>> d086df9d7dbbe6f6abdf9d24269f3bb4b981fa82

import { CrudToolbarComponent } from './crud-toolbar.component';

describe('CrudToolbarComponent', () => {
  let component: CrudToolbarComponent;
  let fixture: ComponentFixture<CrudToolbarComponent>;

<<<<<<< HEAD
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
=======
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudToolbarComponent ]
    })
    .compileComponents();

>>>>>>> d086df9d7dbbe6f6abdf9d24269f3bb4b981fa82
    fixture = TestBed.createComponent(CrudToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
