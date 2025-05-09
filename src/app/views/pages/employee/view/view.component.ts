import {Component, OnInit, ViewChild} from '@angular/core';
import {Salary} from "../../../model/salary";
import {Page} from "../../../model/page";
import {Router} from "@angular/router";
import {SalaryService} from "../../../service/salary.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {Employee} from "../../../model/employee";
import { ColumnMode } from '@swimlane/ngx-datatable';
import {EmployeeService} from "../../../service/employee.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  employee: Employee[] = [];
  employeeTemp: Employee[] = [];
  pg = new Page();
  page = new Page();
  rows = [];
  ColumnMode = ColumnMode;
  filteredData: Employee[] = [];
  columnsWithSearch: string[] = [];
  @ViewChild('table') table: { offset: number; };

  constructor(private router: Router, private service: EmployeeService, private modalService: NgbModal) {
    this.page.pageNumber = 0;
    this.page.size = 20;
  }

  ngOnInit(): void {
    this.getData({offset: 0})
    this.filteredData = this.employee;
    this.columnsWithSearch = Object.keys(this.employee);
  }

  filterDatatable(event: any) {
    const val = event.target.value.toLowerCase();
    // @ts-ignore
    this.filteredData = this.employeeCode.filter(item => item.employeeCode.toLowerCase().indexOf(val) !== -1 || !val);
    this.employeeTemp = this.filteredData;
  }

  getData(pageInfo: any) {
    this.page.pageNumber = pageInfo.offset;
    this.service.viewWithPageParameters(this.page)
      .subscribe(response => {
        if (response.statusCode == 200) {
          this.employee = response.employeeDtoPage.content;
          this.employeeTemp = response.employeeDtoPage.content;
          this.page = this.buildPage(response);
          this.rows = response.employeeDtoPage.content;
        }
      })
  }

  buildPage(this: any, response: any): Page {
    return this.pg = {
      size: response.employeeDtoPage.size, totalElements: response.employeeDtoPage.totalElements,
      totalPages: response.employeeDtoPage.totalPages, pageNumber: response.employeeDtoPage.number
    };
  }

  delete(id: number) {
    Swal.fire({
      title: 'Are you sure you want to delete this record?',
      text: 'Confirm deletion.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.service.delete(id)
          .subscribe(response => {
            if (response.statusCode == 200) {

              Swal.fire({
                title: response.message,
                text: 'Successfully deleted!',
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) {
                  this.ngOnInit();
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
    });
  }
}
