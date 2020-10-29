import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimeSheetDto, TimesheetService } from '../timesheet.service';
import { ToastrService } from 'ngx-toastr';
import { AppConsts } from '../appConstant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //Constructor Call
  constructor(private router: Router, private timeServiceProxy: TimesheetService,private toaster: ToastrService) { }

  // All Global Variables started
  timeSheetObj: TimeSheetDto[];
  cols: any[];

  //Oninit Life Cycle hook started
  ngOnInit() {

    //Fetch all data of timesheet 
    this.timeServiceProxy.getTimeSheetes().subscribe((data: any) => {
      this.timeSheetObj = data;
      this.toaster.success(AppConsts.successFetchDataMsg, '',{timeOut: 3000});
     }, error => { 
      this.toaster.error(AppConsts.errorMsg, '',{timeOut: 3000});
     });

    // Columns initialized
    this.cols = [
      { field: 'userFk.fullName', header: 'Name' },
      { field: 'userFk.designation', header: 'Designation' },
      { field: 'startDateTime', header: 'StartDateTime' },
      { field: 'hoursWorked', header: 'HoursWorked' },
    ];

  }
  //Oninit Life Cycle hook ended

  // Function redirect to timesheet create or edit page  
  createNewTimeSheet(timeSheetId): void {
    if (timeSheetId > 0) {
      this.router.navigate(['timeSheetCreateEdit', timeSheetId]);
    } else {
      this.router.navigate(['timeSheetCreateEdit']);
    }
  }

}

