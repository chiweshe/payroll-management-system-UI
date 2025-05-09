import {Component, OnInit, ViewChild} from '@angular/core';
import {ColumnMode} from "@swimlane/ngx-datatable";
import {Department} from "../../../model/department";
import {Router} from "@angular/router";
import {DepartmentService} from "../../../service/department.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {Page} from "../../../model/page";


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  department: Department[] = [];
  departmentTemp: Department[] = [];

  pg = new Page();
  page = new Page();
  rows = [];
  ColumnMode = ColumnMode;
  filteredData: Department[] = [];
  columnsWithSearch: string[] = [];
  @ViewChild('table') table: { offset: number; };

  constructor(private router: Router, private service: DepartmentService, private modalService: NgbModal) {
    this.page.pageNumber = 0;
    this.page.size = 20;
  }

  ngOnInit(): void {
    this.getData({offset: 0})
    this.filteredData = this.department;
    this.columnsWithSearch = Object.keys(this.department);
  }

  filterDatatable(event: any) {
    const val = event.target.value.toLowerCase();
    // @ts-ignore
    this.filteredData = this.name.filter(item => item.registrationName.toLowerCase().indexOf(val) !== -1 || !val);
    this.departmentTemp = this.filteredData;
  }

  getData(pageInfo: any) {
    this.page.pageNumber = pageInfo.offset;
    this.service.viewWithPageParameters(this.page)
      .subscribe(response => {
        if (response.statusCode == 200) {
          this.department = response.departmentDtoPage.content;
          this.departmentTemp = response.departmentDtoPage.content;
          this.page = this.buildPage(response);
          this.rows = response.departmentDtoPage.content;
        }
      })
  }

  buildPage(this: any, response: any): Page {
    return this.pg = {
      size: response.departmentDtoPage.size, totalElements: response.departmentDtoPage.totalElements,
      totalPages: response.departmentDtoPage.totalPages, pageNumber: response.departmentDtoPage.number
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
