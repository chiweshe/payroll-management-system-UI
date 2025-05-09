import {Component, OnInit, ViewChild} from '@angular/core';
import {Page} from "../../../model/page";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {Salary} from "../../../model/salary";
import { ColumnMode } from '@swimlane/ngx-datatable';
import {SalaryService} from "../../../service/salary.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  salary: Salary[] = [];
  salaryTemp: Salary[] = [];
  pg = new Page();
  page = new Page();
  rows = [];
  ColumnMode = ColumnMode;
  filteredData: Salary[] = [];
  columnsWithSearch: string[] = [];
  @ViewChild('table') table: { offset: number; };

  constructor(private router: Router, private service: SalaryService, private modalService: NgbModal) {
    this.page.pageNumber = 0;
    this.page.size = 20;
  }

  ngOnInit(): void {
    this.getData({offset: 0})
    this.filteredData = this.salary;
    this.columnsWithSearch = Object.keys(this.salary);
  }

  filterDatatable(event: any) {
    const val = event.target.value.toLowerCase();
    // @ts-ignore
    this.filteredData = this.employeeName.filter(item => item.employeeName.toLowerCase().indexOf(val) !== -1 || !val);
    this.salaryTemp = this.filteredData;
  }

  getData(pageInfo: any) {
    this.page.pageNumber = pageInfo.offset;
    this.service.viewWithPageParameters(this.page)
      .subscribe(response => {
        if (response.statusCode == 200) {
          this.salary = response.salaryStructureDtoPage.content;
          this.salaryTemp = response.salaryStructureDtoPage.content;
          this.page = this.buildPage(response);
          this.rows = response.salaryStructureDtoPage.content;
        }
      })
  }

  buildPage(this: any, response: any): Page {
    return this.pg = {
      size: response.salaryStructureDtoPage.size, totalElements: response.salaryStructureDtoPage.totalElements,
      totalPages: response.salaryStructureDtoPage.totalPages, pageNumber: response.salaryStructureDtoPage.number
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
