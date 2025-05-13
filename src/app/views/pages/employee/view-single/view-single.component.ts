import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Employee} from "../../../model/employee";
import {EmployeeService} from "../../../service/employee.service";
import Swal from "sweetalert2";
import {EmployeeDeduction} from "../../../model/employee-deduction";
import {EmployeeAllowance} from "../../../model/employee-allowance";

@Component({
  selector: 'app-view-single',
  templateUrl: './view-single.component.html',
  styleUrls: ['./view-single.component.scss']
})
export class ViewSingleComponent implements OnInit {


  id: any;
  employee: Employee;
  employeeDeductions: EmployeeDeduction[] = [];
  employeeAllowances: EmployeeAllowance[] = [];



  constructor(private router: Router, private service: EmployeeService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(x => {
      this.id = x.get('id');
    });
  }

  ngOnInit(): void {
    this.service.viewById(this.id)
      .subscribe(response => {
        if(response.statusCode == 200){
          this.employee = response.employeeDto;
          this.fetchDeductions(this.employee.id);
          this.fetchAllowances(this.employee.id);

        }else{
          Swal.fire({
            title: 'The requested records could not be found!',
            text: response.message,
            icon: 'warning',
            showCancelButton: false,
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.value) {
              this.router.navigate(['/employee/view']);
            }
          });
        }
      })
  }

  fetchDeductions(employeeId: number): void {
    this.service.viewDeductionsByEmployeeId(employeeId)
      .subscribe(response => {
        if (response.statusCode === 200) {
          this.employeeDeductions = response.employeeDeductionDtoList;
        } else {
          this.employeeDeductions = [];
        }
      });
  }

  fetchAllowances(employeeId: number): void {
    this.service.viewAllowancesByEmployeeId(employeeId)
      .subscribe((response) => {
      if (response.statusCode === 200) {
        this.employeeAllowances = response.employeeAllowanceDtoList;
      } else {
        this.employeeAllowances = [];
      }
    });
  }

}
