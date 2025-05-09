import {Component, OnInit, ViewChild} from '@angular/core';
import {Department} from "../../../model/department";
import {Page} from "../../../model/page";
import {Router} from "@angular/router";
import {DepartmentService} from "../../../service/department.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import { ColumnMode } from '@swimlane/ngx-datatable';
import {Tax} from "../../../model/tax";
import {TaxService} from "../../../service/tax.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  tax: Tax[] = [];
  taxTemp: Tax[] = [];

  pg = new Page();
  page = new Page();
  rows = [];
  ColumnMode = ColumnMode;
  filteredData: Tax[] = [];
  columnsWithSearch: string[] = [];
  @ViewChild('table') table: { offset: number; };

  constructor(private router: Router, private service: TaxService, private modalService: NgbModal) {
    this.page.pageNumber = 0;
    this.page.size = 20;
  }

  ngOnInit(): void {
    this.getData({offset: 0})
    this.filteredData = this.tax;
    this.columnsWithSearch = Object.keys(this.tax);
  }

  filterDatatable(event: any) {
    const val = event.target.value.toLowerCase();
    // @ts-ignore
    this.filteredData = this.lowerBound.filter(item => item.lowerBound.toLowerCase().indexOf(val) !== -1 || !val);
    this.tax = this.filteredData;
  }

  getData(pageInfo: any) {
    this.page.pageNumber = pageInfo.offset;
    this.service.viewWithPageParameters(this.page)
      .subscribe(response => {
        if (response.statusCode == 200) {
          this.tax = response.taxSlabDtoPage.content;
          this.taxTemp = response.taxSlabDtoPage.content;
          this.page = this.buildPage(response);
          this.rows = response.taxSlabDtoPage.content;
        }
      })
  }

  buildPage(this: any, response: any): Page {
    return this.pg = {
      size: response.taxSlabDtoPage.size, totalElements: response.taxSlabDtoPage.totalElements,
      totalPages: response.taxSlabDtoPage.totalPages, pageNumber: response.taxSlabDtoPage.number
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
