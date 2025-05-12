
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Page} from "../model/page";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class PayrollService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'accept': '*/*'
  });
  requestOptions = {headers: this.headers};

  private apiServerUrl = environment.apiBaseUrl;
  private payBaseUrl = "/payroll-management/v1/payroll";
  private completeBasePath = this.apiServerUrl + this.payBaseUrl;

  constructor(private http: HttpClient) {
  }

  public viewList(): Observable<any> {

    return this.http.get<any>(`${this.completeBasePath}`, this.requestOptions).pipe(
      map((data) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      })
    )
  }

  public create(employeeId: number, payrollMonth:string): Observable<any> {

    var postData = JSON.stringify({employeeId: employeeId, payrollMonth: payrollMonth });
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

  public delete(id: number): Observable<any> {

    return this.http.delete<any>(`${this.completeBasePath}/delete/${id}`, this.requestOptions).pipe(
      map((data) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      })
    )
  }

  public createBulk(payrollMonth:string): Observable<any> {

    var postData = JSON.stringify({epayrollMonth: payrollMonth });
    return this.http.post<any>(`${this.completeBasePath}/bulk`, postData, this.requestOptions).pipe(
      map((data) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      })
    )
  }
}
