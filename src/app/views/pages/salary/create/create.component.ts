import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PayrollService} from "../../../service/payroll.service";
import {EmployeeService} from "../../../service/employee.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {SalaryService} from "../../../service/salary.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  validationForm: FormGroup;
  isFormSubmitted: Boolean;
  payrollMonth: string;
  employeeId: number;
  employeeList: any;
  basicSalary: number;
  employeeName: string;
  bonus: number;
  effectiveFrom: string;
  status: string;
  dateCreated: string;
  active: boolean;

  constructor(public formBuilder: FormBuilder, private service: SalaryService, private employeeService: EmployeeService,
              private router: Router) {

  }

  ngOnInit(): void {

    this.employeeService.viewList()
      .subscribe((data: any) => {
        this.employeeList = data.employeeDtoList
      })

    this.validationForm = this.formBuilder.group({
      employeeId: ['', Validators.required],
      basicSalary: ['', Validators.required],
      bonus: [''],
      effectiveFrom: ['', Validators.required],
      active: ['', Validators.required]
    });

    this.isFormSubmitted = false;
  }

  get form() {
    return this.validationForm.controls;
  }

  formSubmit() {
    if (this.validationForm.valid) {
      this.employeeId = this.validationForm.controls.employeeId.value;
      this.basicSalary = this.validationForm.controls.basicSalary.value;
      this.bonus = this.validationForm.controls.bonus.value;
      this.effectiveFrom = this.validationForm.controls.effectiveFrom.value;
      this.active = this.validationForm.controls.active.value;

      this.service.create(this.employeeId, this.basicSalary, this.bonus, this.effectiveFrom, this.active)
        .subscribe(response => {
          if (response.statusCode == 201) {

            Swal.fire({
              title: response.message,
              text: 'Successfully created!',
              icon: 'success',
              showCancelButton: false,
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.value) {
                this.router.navigate(['/salary/view']);
              }
            });

          } else {
            Swal.fire({
              title: 'Error!',
              text: response.message,
              icon: 'error',
              confirmButtonText: 'Close'
            });
          }

        });

    }

    this.isFormSubmitted = true;

  }
}
