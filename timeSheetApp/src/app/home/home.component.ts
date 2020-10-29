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
  totalHours = 0;

  //Oninit Life Cycle hook started
  ngOnInit() {

    //Fetch all data of timesheet 
    this.timeServiceProxy.getTimeSheetes().subscribe((data: any) => {
      this.timeSheetObj = data;
      var obj = [];
      for (let i = 0; i < 7; i++) {
        obj.push(this.timeSheetObj[i]);
      }
      this.totalWorksCalculate(obj);
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

paginate(event)
{
  event.first;
  var obj = [];
  for (let i = event.first ; i < 7 + event.first; i++) {
    obj.push(this.timeSheetObj[i]);
  }
  this.totalWorksCalculate(obj);
}
  //Filetr Calucation of work hours
  onFilter(event,a) {
    if(this.timeSheetObj.length == event.filteredValue.length){
      var obj = [];
      for (let i = 0; i < 7; i++) {
        obj.push(this.timeSheetObj[i]);
      }
      this.totalWorksCalculate(obj);
    }else{
      this.totalWorksCalculate(event.filteredValue);
    }
    
  }

  //calculate hours
  totalWorksCalculate(timeSheetObjm: TimeSheetDto[]){
    this.totalHours = 0;
    for (let i = 0; i < timeSheetObjm.length; i++) {
      this.totalHours = timeSheetObjm[i].hoursWorked+ this.totalHours;
    }
  }

  // Function redirect to timesheet create or edit page  
  createNewTimeSheet(timeSheetId): void {
    if (timeSheetId > 0) {
      this.router.navigate(['timeSheetCreateEdit', timeSheetId]);
    } else {
      this.router.navigate(['timeSheetCreateEdit']);
    }
  }

}

