import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService, TimesheetService, UserDto } from '../timesheet.service';
import { ToastrService } from 'ngx-toastr';
import { AppConsts } from '../appConstant';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  //Declare Global Variable
  userId: any;
  userObj: UserDto[];
  cols: any[];


  //Constructor Call
  constructor(private errorHandler: ErrorHandlerService,private router: Router, private timeServiceProxy: TimesheetService, private toaster: ToastrService) { }

  //Oninit Life Cycle hook started
  ngOnInit() {

    // Columns initialized
    this.cols = [
      { field: 'fullName', header: 'Name' },
      { field: 'designation', header: 'Deignation' },
      { field: 'email', header: 'email' },
      { field: 'phoneNumber', header: 'phoneNumber' },
    ];

    // Fetch all users data 
    this.timeServiceProxy.getUsers().subscribe((data: any) => {
      this.userObj = data;
      this.toaster.success(AppConsts.successFetchDataMsg, '',
        { timeOut: 3000 });
    },
    (error) => {
      this.toaster.error(AppConsts.errorMsg, '',{ timeOut: 3000 });

      //Exception Handling error from api we can capture here and display, for this repoen below code 
       //this.errorHandler.handleError(error);
       //this.toaster.error(this.errorHandler.errorMessage, '',{timeOut: 3000});
    });



  }
  //Oninit Life Cycle hook ended

  // Function redirect to timesheet create or edit page  
  createNewUser(userId): void {
    if (userId > 0) {
      this.router.navigate(['userCreateEdit', userId]);
    } else {
      this.router.navigate(['userCreateEdit']);
    }
  }


}

