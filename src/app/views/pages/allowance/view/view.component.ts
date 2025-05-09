import {Component, OnInit, ViewChild} from '@angular/core';
import {Page} from "../../../model/page";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {Allowance} from "../../../model/allowance";
import { ColumnMode } from '@swimlane/ngx-datatable';
import {AllowanceService} from "../../../service/allowance.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  allowance: Allowance[] = [];
  allowanceTemp: Allowance[] = [];
  pg = new Page();
  page = new Page();
  rows = [];
  ColumnMode = ColumnMode;
  filteredData: Allowance[] = [];
  columnsWithSearch: string[] = [];
  @ViewChild('table') table: { offset: number; };

  constructor(private router: Router, private service: AllowanceService, private modalService: NgbModal) {
    this.page.pageNumber = 0;
    this.page.size = 20;
  }

  ngOnInit(): void {
    this.getData({offset: 0})
    this.filteredData = this.allowance;
    this.columnsWithSearch = Object.keys(this.allowance);
  }

  filterDatatable(event: any) {
    const val = event.target.value.toLowerCase();
    // @ts-ignore
    this.filteredData = this.name.filter(item => item.registrationName.toLowerCase().indexOf(val) !== -1 || !val);
    this.allowanceTemp = this.filteredData;
  }

  getData(pageInfo: any) {
    this.page.pageNumber = pageInfo.offset;
    this.service.viewWithPageParameters(this.page)
      .subscribe(response => {
        if (response.statusCode == 200) {
          this.allowance = response.allowanceDtoPage.content;
          this.allowanceTemp = response.allowanceDtoPage.content;
          this.page = this.buildPage(response);
          this.rows = response.allowanceDtoPage.content;
        }
      })
  }

  buildPage(this: any, response: any): Page {
    return this.pg = {
      size: response.allowanceDtoPage.size, totalElements: response.allowanceDtoPage.totalElements,
      totalPages: response.allowanceDtoPage.totalPages, pageNumber: response.allowanceDtoPage.number
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
