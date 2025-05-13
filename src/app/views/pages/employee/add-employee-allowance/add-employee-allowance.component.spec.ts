import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeAllowanceComponent } from './add-employee-allowance.component';

describe('AddEmployeeAllowanceComponent', () => {
  let component: AddEmployeeAllowanceComponent;
  let fixture: ComponentFixture<AddEmployeeAllowanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeAllowanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
