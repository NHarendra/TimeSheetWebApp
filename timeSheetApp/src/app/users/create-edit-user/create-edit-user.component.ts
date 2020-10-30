import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService, TimeSheetDto, TimesheetService, UserDto } from 'src/app/timesheet.service';
import { ToastrService } from 'ngx-toastr';
import { AppConsts } from 'src/app/appConstant';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.css']
})
export class CreateEditUserComponent implements OnInit {
  
  //Global variable
  timeSheetObj = <TimeSheetDto>{};
  userObj = <UserDto>{};
  userId:any;
  designations: InterfaceDesgination[];
  

  //Constructor Call
  constructor(private errorHandler: ErrorHandlerService,private router: Router,  private route: ActivatedRoute, private timeServiceProxy: TimesheetService,private toaster: ToastrService) { }

  //Onint life cycle hook started
  ngOnInit() {

    //Designation lookup for dropdown
    this.designations = [
      {label: 'CEO', value: 'CEO'},
      {label: 'Manager', value: 'Manager'},
      {label: 'Team Lead', value: 'Team Lead'},
      {label: 'QA', value: 'QA'},
      {label: 'Senior Developer', value: 'Senior Developer'},
      {label: ' Developer', value: ' Developer'}
     ];

      //catch id from url if passed from previous component
      this.userId = this.route.snapshot.paramMap.get('id');

      // get timesheet data for update purpose iff timesheetid available
      if (parseInt(this.userId) > 0) {
        this.timeServiceProxy.getUser(parseInt(this.userId)).subscribe((data: any) => {
          this.userObj = data;
          this.toaster.success(AppConsts.successFetchDataMsg, '',{timeOut: 3000});
        },
        (error) => {
          this.toaster.error(AppConsts.errorMsg, '',{ timeOut: 3000 });
    
          //Exception Handling error from api we can capture here and display, for this repoen below code 
           //this.errorHandler.handleError(error);
           //this.toaster.error(this.errorHandler.errorMessage, '',{timeOut: 3000});
        });
      }
  }


  // Cancel fun to back/navigate to users page
  cancelFun(){
      this.router.navigate(['users']);
  }

    // Save data of timesheet 
  saveUser(){
     
     if(this.userObj.id > 0){
      this.timeServiceProxy.updateUser(this.userObj).subscribe((data: any) => {
        this.router.navigate(['users']);
        this.toaster.success(AppConsts.successUpdatedMsg, '',{timeOut: 3000});
      }, 
      (error) => {
        this.toaster.error(AppConsts.errorMsg, '',{ timeOut: 3000 });
  
        //Exception Handling error from api we can capture here and display, for this repoen below code 
         //this.errorHandler.handleError(error);
         //this.toaster.error(this.errorHandler.errorMessage, '',{timeOut: 3000});
      });
     }else{
      this.timeServiceProxy.postUser(this.userObj).subscribe((data: any) => {
        this.router.navigate(['users']);
        this.toaster.success(AppConsts.successSavedMsg, '',{timeOut: 3000});
      }, 
      (error) => {
        this.toaster.error(AppConsts.errorMsg, '',{ timeOut: 3000 });
  
        //Exception Handling error from api we can capture here and display, for this repoen below code 
         //this.errorHandler.handleError(error);
         //this.toaster.error(this.errorHandler.errorMessage, '',{timeOut: 3000});
      });
     }
}
}

interface InterfaceDesgination {
  label: string;
  value: string;
}