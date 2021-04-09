import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtodoPage } from './addtodo.page';

describe('AddtodoPage', () => {
  let component: AddtodoPage;
  let fixture: ComponentFixture<AddtodoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtodoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtodoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
