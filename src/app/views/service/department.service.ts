import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import {Page} from "../model/page";

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${this.authToken}`,
    // 'Authorisation': environment.loggedInUser,
    'accept': '*/*'
  });
  requestOptions = {headers: this.headers};

  private apiServerUrl = environment.apiBaseUrl;
  private departmentsBaseUrl = "/payroll-management/v1/department";
  private completeBasePath = this.apiServerUrl + this.departmentsBaseUrl;

  constructor(private http: HttpClient) {
  }

  public viewList(): Observable<any> {

    return this.http.get<any>(`${this.completeBasePath}/list`, this.requestOptions).pipe(
      map((data) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      })
    )
  }

  public create(name: string): Observable<any> {

    var postData = JSON.stringify({name: name});
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
    return this.http.get<any>(`${this.completeBasePath + "/page"}`, options).pipe(
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

}
