import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import {Page} from "../model/page";

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'accept': '*/*'
  });
  requestOptions = {headers: this.headers};

  private apiServerUrl = environment.apiBaseUrl;
  private employeeBaseUrl = "/payroll-management/v1/employee";
  private employeeDeductionBaseUrl = "/payroll-management/v1/employee-deductions";
  private employeeAllowanceBaseUrl = "/payroll-management/v1/employee-allowances";
  private completeBasePath = this.apiServerUrl + this.employeeBaseUrl;
  private  completeBasePathForAllowances= this.apiServerUrl + this.employeeAllowanceBaseUrl
  private  completeBasePathForDeductions= this.apiServerUrl + this.employeeDeductionBaseUrl

  constructor(private http: HttpClient) {
  }

  public viewList(): Observable<any> {

    return this.http.get<any>(`${this.completeBasePath}/all`, this.requestOptions).pipe(
      map((data) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      })
    )
  }

  public create(firstName: string, lastName: string, birthDate: string,
                email:string, phone: string, address: string,employeeCode: string, hireDate:string, jobTitle: string,
                employmentType:string, workLocation: string, departmentId: number ): Observable<any> {

    var postData = JSON.stringify({firstName: firstName,
      lastName:lastName, birthDate:birthDate, email:email, phone: phone, address:address, employeeCode:employeeCode,
      hireDate:hireDate, jobTitle:jobTitle,  employmentType:employmentType, workLocation:workLocation, departmentId:departmentId
    });
    return this.http.post<any>(`${this.completeBasePath}`, postData, this.requestOptions).pipe(
      map((data) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      })
    )
  }

  public viewWithPageParameters(page: Page): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page", page.pageNumber).append("size", page.size);
    const options = {params: queryParams, headers: this.headers};
    return this.http.get<any>(`${this.completeBasePath + "/pages"}`, options).pipe(
      map((data) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      })
    )
  }

  public viewById(id: number): Observable<any> {

    return this.http.get<any>(`${this.completeBasePath}/` + id, this.requestOptions).pipe(
      map((data) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      })
    )
  }

  public viewDeductionsByEmployeeId(employeeId: number): Observable<any> {

    return this.http.get<any>(`${this.completeBasePathForDeductions}/employee-id/${employeeId}`, this.requestOptions).pipe(
      map((data) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      })
    )
  }
  public viewAllowancesByEmployeeId(employeeId: number): Observable<any> {

    return this.http.get<any>(`${this.completeBasePathForAllowances}/employee-id/${employeeId}`, this.requestOptions).pipe(
      map((data) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      })
    )
  }

  public delete(id: number): Observable<any> {

    return this.http.delete<any>(`${this.completeBasePath}/delete/${id}`, this.requestOptions).pipe(
      map((data) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      })
    )
  }


  public addDeduction( employeeId: number, deductionId: number, amount: number ): Observable<any> {

    var postData = JSON.stringify({employeeId: employeeId,
      deductionId:deductionId, amount:amount});
    return this.http.post<any>(`${this.completeBasePathForDeductions}`, postData, this.requestOptions).pipe(
      map((data) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      })
    )
  }
}
