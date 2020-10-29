import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse,HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';


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

const baseUrl = 'https://localhost:44341/api';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  constructor(private http: HttpClient) { }

  // User related services
  getUser(degreeId: number | null | undefined): Observable<UserDtoObject> {
    return this.http.get<UserDtoObject>(baseUrl + '/Degrees/GetAllStreamDegreeLookupForWeb?degreeId='+degreeId, httpOptions);
  }

  getUsers(degreeId: number | null | undefined): Observable<UserDtoObject> {
    return this.http.get<UserDtoObject>(baseUrl + "/Users", httpOptions);
  }


    // Timesheet related services
    getTimeSheet(degreeId: number | null | undefined): Observable<TimeSheetDtoObject> {
      return this.http.get<TimeSheetDtoObject>(baseUrl + '/Degrees/GetAllStreamDegreeLookupForWeb?degreeId='+degreeId, httpOptions);
    }
  
    getTimeSheetes(): Observable<TimeSheetDtoObject> {
      return this.http.get<TimeSheetDtoObject>(baseUrl+"/TimeSheets", httpOptions);
    }




}

export interface IUserDto {
  Id:number| undefined;
  FullName: string | undefined;
  Email: string | undefined;
  PhoneNumber: string | undefined;
  IsActive: boolean | undefined;
  Designation: string | undefined;
}

export class UserDto implements IUserDto{
  Id!: number| undefined;
  FullName!: string | undefined;
  Email!: string | undefined;
  PhoneNumber!: string | undefined;
  IsActive!: boolean | undefined;
  Designation!: string | undefined;
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
  UserFk: UserDto | undefined;
  StartDateTime: moment.Moment | undefined;
  HoursWorked: number | undefined;
  IsActive: boolean | undefined;
}

export class TimeSheetDto implements ITimeSheetDto{
  UserFk!: UserDto | undefined;
  StartDateTime!: moment.Moment | undefined;
  HoursWorked!: number | undefined;
  IsActive!: boolean | undefined;
}

export interface TimeSheetDtoObject {
  result: TimeSheetDto;
  targetUrl?: any;
  success: boolean;
  error?: any;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}
