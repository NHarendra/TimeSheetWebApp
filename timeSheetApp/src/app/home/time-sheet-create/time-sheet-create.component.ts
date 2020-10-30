import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService, LookupDto, TimeSheetDto, TimeSheetDtoObject, TimesheetService } from 'src/app/timesheet.service';
import { ToastrService } from 'ngx-toastr';
import { AppConsts } from 'src/app/appConstant';
import * as moment from 'moment';

@Component({
  selector: 'app-time-sheet-create',
  templateUrl: './time-sheet-create.component.html',
  styleUrls: ['./time-sheet-create.component.css']
})
export class TimeSheetCreateComponent implements OnInit {

  //Declare Global Variable
  timesheetId: any;
  userLookup: LookupDto[];
  timeSheetObj = <TimeSheetDto>{};
  selectedBook: string;
  startdtime: any;

  //Constructor Call
  constructor(private errorHandler: ErrorHandlerService, private router: Router, private route: ActivatedRoute, private timeServiceProxy: TimesheetService, private toaster: ToastrService) { }

  //Oninit Life Cycle hook started
  ngOnInit() {

    // get user lookup data for dropdown
    this.timeServiceProxy.getUserLookup().subscribe((data: any) => {
      this.userLookup = data;
    },
     error => {
      this.toaster.error(AppConsts.errorMsg, '', { timeOut: 3000 });

      //Exception Handling error from api we can capture here and display, for this repoen below code 
      //this.errorHandler.handleError(error);
      //this.toaster.error(this.errorHandler.errorMessage, '',{timeOut: 3000});
    });

    //catch id from url if passed from previous component
    this.timesheetId = this.route.snapshot.paramMap.get('id');

    // get timesheet data for update purpose iff timesheetid available
    if (parseInt(this.timesheetId) > 0) {
      this.timeServiceProxy.getTimeSheet(parseInt(this.timesheetId)).subscribe((data: any) => {
        this.toaster.success(AppConsts.successFetchDataMsg, '', { timeOut: 3000 });
        this.timeSheetObj = data;
        //check wheather date is not null or not
        if (this.timeSheetObj.startDateTime != null) {
          var dates = this.timeSheetObj.startDateTime.toString();
          this.startdtime = new Date(dates);
        }
      }, error => {
        this.toaster.error(AppConsts.errorMsg, '', { timeOut: 3000 });

        //Exception Handling error from api we can capture here and display, for this repoen below code 
        //this.errorHandler.handleError(error);
        //this.toaster.error(this.errorHandler.errorMessage, '',{timeOut: 3000});
      });
    }
  }

  // Cancel fun to back/navigate to home page
  cancelFun() {
    this.router.navigate(['home']);
  }

  // Save data of timesheet 
  saveTimeSheet() {
    var s = moment(this.startdtime);
    this.timeSheetObj.startDateTime = s;
    if (this.timeSheetObj.id > 0) {
      this.timeServiceProxy.updateTimeSheet(this.timeSheetObj).subscribe((data: any) => {
        this.timeSheetObj = data;
        this.router.navigate(['home']);
        this.toaster.success(AppConsts.successUpdatedMsg, '', { timeOut: 3000 });
      }, error => {
        this.toaster.error(AppConsts.errorMsg, '', { timeOut: 3000 });

        //Exception Handling error from api we can capture here and display, for this repoen below code 
        //this.errorHandler.handleError(error);
        //this.toaster.error(this.errorHandler.errorMessage, '',{timeOut: 3000});
      });
    } else {
      this.timeServiceProxy.postTimeSheet(this.timeSheetObj).subscribe((data: any) => {
        this.timeSheetObj = data;
        this.router.navigate(['home']);
        this.toaster.success(AppConsts.successSavedMsg, '', { timeOut: 3000 });
      },
      (error) => {
        this.toaster.error(AppConsts.errorMsg, '', { timeOut: 3000 });
  
        //Exception Handling error from api we can capture here and display, for this repoen below code 
         //this.errorHandler.handleError(error);
         //this.toaster.error(this.errorHandler.errorMessage, '',{timeOut: 3000});
      });
    }
  }

}
