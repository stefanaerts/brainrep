/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DropinComponent } from './dropin.component';

describe('DropinComponent', () => {
  let component: DropinComponent;
  let fixture: ComponentFixture<DropinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
