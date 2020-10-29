import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimeSheetDto, TimesheetService } from '../timesheet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //Constructor Call
  constructor(private router: Router, private timeServiceProxy: TimesheetService) { }

  // All Global Variables started
  timeSheetObj: TimeSheetDto[];
  cols: any[];

  //Oninit Life Cycle hook started
  ngOnInit() {

    // Fetch all data of timesheet 
    this.timeServiceProxy.getTimeSheetes().subscribe((data: any) => {
      this.timeSheetObj = data;
    }, error => { console.log("Something went wrong") });

    // Columns initialized
    this.cols = [

      { field: 'name', header: 'Name' },
      { field: 'deignation', header: 'Deignation' },
      { field: 'startDateTime', header: 'StartDateTime' },
      { field: 'hoursWorked', header: 'HoursWorked' },
    ];

  }
  //Oninit Life Cycle hook ended

  // Function redirect to timesheet create or edit page  
  createNewTimeSheet(timeSheetId): void {
    if (timeSheetId > 0) {
      this.router.navigate(['timeSheetCreate', timeSheetId]);
    } else {
      this.router.navigate(['timeSheetCreate']);
    }
  }

}

