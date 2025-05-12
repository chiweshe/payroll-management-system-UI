import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PayrollService} from "../../../service/payroll.service";
import {EmployeeService} from "../../../service/employee.service";
import {Router} from "@angular/router";

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


  constructor(public formBuilder: FormBuilder, private service: PayrollService, private employeeService: EmployeeService,
              private router: Router) {

  }

  ngOnInit(): void {

    this.employeeService.viewList()
      .subscribe((data: any) => {
        this.employeeList = data.employeeDtoList
      })

    this.validationForm = this.formBuilder.group({
      employeeId : ['', Validators.required],
      payrollMonth : ['', Validators.required]
    });

    this.isFormSubmitted = false;
  }

  get form() {
    return this.validationForm.controls;
  }

  formSubmit() {
    if(this.validationForm.valid) {
      this.employeeId = this.validationForm.controls.employeeId.value;
      this.payrollMonth = this.validationForm.controls.payrollMonth.value;

      this.service.create(this.employeeId, this.payrollMonth)
        .subscribe(response => {
          if(response.statusCode == 201){

            Swal.fire({
              title: response.message,
              text: 'Successfully created!',
              icon: 'success',
              showCancelButton: false,
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.value) {
                this.router.navigate(['/payroll/view']);
              }
            });

          }else{
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

