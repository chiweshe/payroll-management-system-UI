import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PayrollService} from "../../../service/payroll.service";
import {EmployeeService} from "../../../service/employee.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-bulk',
  templateUrl: './create-bulk.component.html',
  styleUrls: ['./create-bulk.component.scss']
})
export class CreateBulkComponent implements OnInit {

  validationForm: FormGroup;
  isFormSubmitted: Boolean;
  payrollMonth: string;

  constructor(public formBuilder: FormBuilder, private service: PayrollService, private router: Router) {

  }

  ngOnInit(): void {

    this.validationForm = this.formBuilder.group({
      payrollMonth : ['', Validators.required]
    });

    this.isFormSubmitted = false;
  }

  get form() {
    return this.validationForm.controls;
  }

  formSubmit() {
    if(this.validationForm.valid) {
      this.payrollMonth = this.validationForm.controls.payrollMonth.value;

      this.service.createBulk(this.payrollMonth)
        .subscribe(response => {
          if(response.statusCode == 200){

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

