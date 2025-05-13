import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeDeductionComponent } from './add-employee-deduction.component';

describe('AddEmployeeDeductionComponent', () => {
  let component: AddEmployeeDeductionComponent;
  let fixture: ComponentFixture<AddEmployeeDeductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeDeductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
