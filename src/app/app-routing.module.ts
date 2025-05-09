import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';


const routes: Routes = [
  { path:'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'apps',
        loadChildren: () => import('./views/pages/apps/apps.module').then(m => m.AppsModule)
      },
      {
        path: 'allowance',
        loadChildren: () => import('./views/pages/allowance/allowance.module').then(m => m.AllowanceModule)
      },
       {
        path: 'deduction',
        loadChildren: () => import('./views/pages/deduction/deduction.module').then(m => m.DeductionModule)
      },
      {
        path: 'employee',
        loadChildren: () => import('./views/pages/employee/employee.module').then(m => m.EmployeeModule)
      },
      {
        path: 'department',
        loadChildren: () => import('./views/pages/department/department.module').then(m => m.DepartmentModule)
      },
      {
        path: 'salary',
        loadChildren: () => import('./views/pages/salary/salary.module').then(m => m.SalaryModule)
      },
      {
        path: 'tax',
        loadChildren: () => import('./views/pages/tax/tax.module').then(m => m.TaxModule)
      },
      {
        path: 'payroll',
        loadChildren: () => import('./views/pages/payroll/payroll.module').then(m => m.PayrollModule)
      },


      // {
      //   path: 'advanced-ui',
      //   loadChildren: () => import('./views/pages/advanced-ui/advanced-ui.module').then(m => m.AdvancedUiModule)
      // },
      // {
      //   path: 'form-elements',
      //   loadChildren: () => import('./views/pages/form-elements/form-elements.module').then(m => m.FormElementsModule)
      // },
      // {
      //   path: 'advanced-form-elements',
      //   loadChildren: () => import('./views/pages/advanced-form-elements/advanced-form-elements.module').then(m => m.AdvancedFormElementsModule)
      // },
      // {
      //   path: 'charts-graphs',
      //   loadChildren: () => import('./views/pages/charts-graphs/charts-graphs.module').then(m => m.ChartsGraphsModule)
      // },
      // {
      //   path: 'tables',
      //   loadChildren: () => import('./views/pages/tables/tables.module').then(m => m.TablesModule)
      // },
      // {
      //   path: 'icons',
      //   loadChildren: () => import('./views/pages/icons/icons.module').then(m => m.IconsModule)
      // },
      // {
      //   path: 'general',
      //   loadChildren: () => import('./views/pages/general/general.module').then(m => m.GeneralModule)
      // },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      'type': 404,
      'title': 'Page Not Found',
      'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
