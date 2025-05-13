import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DeductionService} from "../../../service/deduction.service";
import {EmployeeService} from "../../../service/employee.service";

@Component({
  selector: 'app-add-employee-deduction',
  templateUrl: './add-employee-deduction.component.html',
  styleUrls: ['./add-employee-deduction.component.scss']
})
export class AddEmployeeDeductionComponent implements OnInit {

  validationForm: FormGroup;
  isFormSubmitted: boolean = false;
  employeeId: number;
  deductionList: any[] = [];

  constructor(
    private route: ActivatedRoute, private fb: FormBuilder, private employeeService: EmployeeService,
    private deductionService: DeductionService, private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = +(this.route.snapshot.paramMap.get('employeeId') ?? 0);
    this.validationForm = this.fb.group({
      deductionId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });

    this.loadDeductions();
  }

  get form() {
    return this.validationForm.controls;
  }

  loadDeductions() {
    this.deductionService.viewList()
      .subscribe(res => {
        if (res.statusCode === 200) {
          this.deductionList = res.deductionDtoList;
        }
      });
  }

  formSubmit() {
    this.isFormSubmitted = true;

    if (this.validationForm.valid) {
      const payload = {
        employeeId: this.employeeId,
        deductionId: this.validationForm.value.deductionId,
        amount: this.validationForm.value.amount
      };

      this.employeeService.addDeduction(payload)
        .subscribe(response => {
          if (response.statusCode === 201) {
            Swal.fire({
              title: 'Success!',
              text: response.message,
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate(['/employee/view', this.employeeId]);
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: response.message,
              icon: 'error'
            });
          }
        });
    }
  }
}
