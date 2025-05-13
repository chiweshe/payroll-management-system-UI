import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AllowanceService} from "../../../service/allowance.service";
import {EmployeeService} from "../../../service/employee.service";

@Component({
  selector: 'app-add-employee-allowance',
  templateUrl: './add-employee-allowance.component.html',
  styleUrls: ['./add-employee-allowance.component.scss']
})
export class AddEmployeeAllowanceComponent implements OnInit {

  validationForm: FormGroup;
  isFormSubmitted: boolean = false;
  employeeId: number;
  allowanceList: any[] = [];

  constructor(private fb: FormBuilder, private service: EmployeeService, private route: ActivatedRoute,
              private router: Router, private allowanceService: AllowanceService
  ) {}

  ngOnInit(): void {
    this.employeeId = +(this.route.snapshot.paramMap.get('employeeId') ?? 0);
    this.validationForm = this.fb.group({
      allowanceId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });

    this.loadAllowances();
  }

  get form() {
    return this.validationForm.controls;
  }

  loadAllowances(): void {
    this.allowanceService.viewList().subscribe(res => {
      if (res.statusCode === 200) {
        this.allowanceList = res.allowanceDtoList;
      }
    });
  }

  formSubmit(): void {
    this.isFormSubmitted = true;

    if (this.validationForm.valid) {
      const payload = {
        employeeId: this.employeeId,
        allowanceId: this.validationForm.value.allowanceId,
        amount: this.validationForm.value.amount
      };

      this.service.addEmployeeAllowance(payload)
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
