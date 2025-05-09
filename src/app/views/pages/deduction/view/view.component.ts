import {Component, OnInit, ViewChild} from '@angular/core';
import {Page} from "../../../model/page";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {Deduction} from "../../../model/deduction";
import { ColumnMode } from '@swimlane/ngx-datatable';
import {DeductionService} from "../../../service/deduction.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  deduction: Deduction[] = [];
  deductionTemp: Deduction[] = [];
  pg = new Page();
  page = new Page();
  rows = [];
  ColumnMode = ColumnMode;
  filteredData: Deduction[] = [];
  columnsWithSearch: string[] = [];
  @ViewChild('table') table: { offset: number; };

  constructor(private router: Router, private service: DeductionService, private modalService: NgbModal) {
    this.page.pageNumber = 0;
    this.page.size = 20;
  }

  ngOnInit(): void {
    this.getData({offset: 0})
    this.filteredData = this.deduction;
    this.columnsWithSearch = Object.keys(this.deduction);
  }

  filterDatatable(event: any) {
    const val = event.target.value.toLowerCase();
    // @ts-ignore
    this.filteredData = this.name.filter(item => item.registrationName.toLowerCase().indexOf(val) !== -1 || !val);
    this.deductionTemp = this.filteredData;
  }

  getData(pageInfo: any) {
    this.page.pageNumber = pageInfo.offset;
    this.service.viewWithPageParameters(this.page)
      .subscribe(response => {
        if (response.statusCode == 200) {
          this.deduction = response.deductionDtoPage.content;
          this.deductionTemp = response.deductionDtoPage.content;
          this.page = this.buildPage(response);
          this.rows = response.deductionDtoPage.content;
        }
      })
  }

  buildPage(this: any, response: any): Page {
    return this.pg = {
      size: response.deductionDtoPage.size, totalElements: response.deductionDtoPage.totalElements,
      totalPages: response.deductionDtoPage.totalPages, pageNumber: response.deductionDtoPage.number
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


