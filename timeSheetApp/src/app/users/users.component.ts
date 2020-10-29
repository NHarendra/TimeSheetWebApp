import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimesheetService, UserDto } from '../timesheet.service';

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
  constructor(private router: Router, private timeServiceProxy: TimesheetService) { }

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
    }, error => { console.log("Something went wrong") });



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

interface Book {
  label: string;
  value: string;
}