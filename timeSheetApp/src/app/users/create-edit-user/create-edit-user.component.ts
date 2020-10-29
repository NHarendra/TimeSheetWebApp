import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeSheetDto, TimesheetService, UserDto } from 'src/app/timesheet.service';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.css']
})
export class CreateEditUserComponent implements OnInit {
  
  timeSheetObj = <TimeSheetDto>{};
  userObj = <UserDto>{};
  userId:any;
  designations: InterfaceDesgination[];
  

  //Constructor Call
  constructor(private router: Router,  private route: ActivatedRoute, private timeServiceProxy: TimesheetService) { }

  ngOnInit() {

    this.designations = [
      {label: 'CEO', value: 'CEO'},
      {label: 'Manager', value: 'Manager'},
      {label: 'Team Lead', value: 'Team Lead'},
      {label: 'QA', value: 'QA'},
      {label: 'Senior Developer', value: 'Senior Developer'},
      {label: ' Developer', value: ' Developer'},
    
  ];

      //catch id from url if passed from previous component
      this.userId = this.route.snapshot.paramMap.get('id');

      // get timesheet data for update purpose iff timesheetid available
      if (parseInt(this.userId) > 0) {
        this.timeServiceProxy.getUser(parseInt(this.userId)).subscribe((data: any) => {
          this.userObj = data;
        }, error => { console.log("Something went wrong") });
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
        alert("data saved successfully!!")
      }, error => { console.log("Something went wrong") });
     }else{
      this.timeServiceProxy.postUser(this.userObj).subscribe((data: any) => {
        alert("data saved successfully!!")
      }, error => { console.log("Something went wrong") });
     }
}
}

interface InterfaceDesgination {
  label: string;
  value: string;
}