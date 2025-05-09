import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { LayoutModule } from './views/layout/layout.module';
import { AuthGuard } from './core/guard/auth.guard';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';

import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { CreateComponent } from './views/pages/create/create.component';
import { ViewComponent } from './views/pages/view/view.component';
import { ViewSingleComponent } from './views/pages/view-single/view-single.component';
import { UpdateComponent } from './views/pages/update/update.component';
import {HttpClientModule} from "@angular/common/http";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgSelectModule} from "@ng-select/ng-select";
import {DepartmentComponent} from "./views/pages/department/department.component";
import {EmployeeComponent} from "./views/pages/employee/employee.component";
import {AllowanceComponent} from "./views/pages/allowance/allowance.component";
import {DeductionComponent} from "./views/pages/deduction/deduction.component";
import {TaxComponent} from "./views/pages/tax/tax.component";
import {PayrollComponent} from "./views/pages/payroll/payroll.component";
import {SalaryComponent} from "./views/pages/salary/salary.component";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    CreateComponent,
    ViewComponent,
    ViewSingleComponent,
    UpdateComponent,
    DepartmentComponent,
    EmployeeComponent,
    AllowanceComponent,
    DeductionComponent,
    TaxComponent,
    PayrollComponent,
    SalaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    NgxDatatableModule,
    NgSelectModule,
    NgbTooltipModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HIGHLIGHT_OPTIONS, // https://www.npmjs.com/package/ngx-highlightjs
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
