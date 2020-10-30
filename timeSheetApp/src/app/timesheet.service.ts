import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { Router } from '@angular/router';


// Http Options
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': '*',
  })
}

// Globally Define Http Web Api Url
const baseUrl = 'https://localhost:44341/api';

@Injectable({
  providedIn: 'root'
})

export class TimesheetService {

  constructor(private http: HttpClient) { }

  // User related services
  getUser(Id: number | null | undefined): Observable<UserDtoObject> {
    return this.http.get<UserDtoObject>(baseUrl + "/Users/" + Id, httpOptions);
  }

  getUsers(): Observable<UserDtoObject> {
    return this.http.get<UserDtoObject>(baseUrl + "/Users", httpOptions);
  }

  postUser(model: UserDto): Observable<any> {
    return this.http.post<any>(baseUrl + "/Users", model, httpOptions);
  }

  updateUser(model: UserDto): Observable<any> {
    return this.http.put<any>(baseUrl + "/Users", model, httpOptions);
  }

  getUserLookup(): Observable<UserDtoObject[]> {
    return this.http.post<UserDtoObject[]>(baseUrl + "/Users/GetUserLookup", httpOptions);
  }


  // Timesheet related services
  getTimeSheet(Id: number | null | undefined): Observable<TimeSheetDtoObject> {
    return this.http.get<TimeSheetDtoObject>(baseUrl + "/TimeSheets/" + Id, httpOptions);
  }

  getTimeSheetes(): Observable<TimeSheetDtoObject> {
    return this.http.get<TimeSheetDtoObject>(baseUrl + "/TimeSheets", httpOptions);
  }

  postTimeSheet(model: TimeSheetDto): Observable<any> {
    return this.http.post<any>(baseUrl + "/TimeSheets", model, httpOptions);
  }

  updateTimeSheet(model: TimeSheetDto): Observable<any> {
    return this.http.put<any>(baseUrl + "/TimeSheets", model, httpOptions);
  }

}


@Injectable()
export class ErrorHandlerService {
  public errorMessage: string = '';

  constructor(private router: Router) { }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 500) {
      this.handle500Error(error);
    }
    else if (error.status === 404) {
      this.handle404Error(error)
    }
    else {
      this.handleOtherError(error);
    }
  }

  private handle500Error(error: HttpErrorResponse) {
    this.createErrorMessage(error);
    this.router.navigate(['/500']);
  }

  private handle404Error(error: HttpErrorResponse) {
    this.createErrorMessage(error);
    this.router.navigate(['/404']);
  }

  private handleOtherError(error: HttpErrorResponse) {
    this.createErrorMessage(error);
    //TODO: this will be fixed later;
  }

  private createErrorMessage(error: HttpErrorResponse) {
    this.errorMessage = error.error ? error.error : error.statusText;
  }

}


export interface IUserDto {
  id: number | undefined;
  fullName: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  isActive: boolean | undefined;
  designation: string | undefined;
}

export class UserDto implements IUserDto {
  id!: number | undefined;
  fullName!: string | undefined;
  email!: string | undefined;
  phoneNumber!: string | undefined;
  isActive!: boolean | undefined;
  designation!: string | undefined;
}

export interface UserDtoObject {
  result: UserDto;
  targetUrl?: any;
  success: boolean;
  error?: any;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}



export interface ITimeSheetDto {
  id: number | undefined;
  userFk: UserDto | undefined;
  userId: number | undefined;
  startDateTime: moment.Moment | undefined;
  hoursWorked: number | undefined;
  isActive: boolean | undefined;
}

export class TimeSheetDto implements ITimeSheetDto {
  id!: number | undefined;
  userFk!: UserDto | undefined;
  userId!: number | undefined;
  startDateTime!: moment.Moment | undefined;
  hoursWorked!: number | undefined;
  isActive!: boolean | undefined;
}

export interface TimeSheetDtoObject {
  result: TimeSheetDto;
  targetUrl?: any;
  success: boolean;
  error?: any;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

export interface ILookupDto {
  value: number | undefined;
  label: string | undefined;
}

export class LookupDto implements ILookupDto {
  value!: number | undefined;
  label!: string | undefined;
}

export interface LookupDtObject {
  result: LookupDto;
  targetUrl?: any;
  success: boolean;
  error?: any;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}