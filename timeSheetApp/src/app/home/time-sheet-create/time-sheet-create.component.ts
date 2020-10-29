import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupDto, TimeSheetDto, TimeSheetDtoObject, TimesheetService } from 'src/app/timesheet.service';

@Component({
  selector: 'app-time-sheet-create',
  templateUrl: './time-sheet-create.component.html',
  styleUrls: ['./time-sheet-create.component.css']
})
export class TimeSheetCreateComponent implements OnInit {

  //Declare Global Variable
  timesheetId:any;
  userLookup: LookupDto[];
  timeSheetObj = <TimeSheetDto>{};
  selectedBook: string;
  startdtime:any;
  
  //Constructor Call
  constructor(private router: Router,  private route: ActivatedRoute, private timeServiceProxy: TimesheetService) { }

  //Oninit Life Cycle hook started
  ngOnInit() {

    this.timeServiceProxy.getUserLookup().subscribe((data: any) => {
      this.userLookup = data;
    }, error => { console.log("Something went wrong") });

    //catch id from url if passed from previous component
    this.timesheetId = this.route.snapshot.paramMap.get('id');

    // get timesheet data for update purpose iff timesheetid available
    if (parseInt(this.timesheetId) > 0) {
      this.timeServiceProxy.getTimeSheet(parseInt(this.timesheetId) ).subscribe((data: any) => {
        this.timeSheetObj = data;
        //check wheather date is not null or not
        if(this.timeSheetObj.startDateTime != null){
        var dates = this.timeSheetObj.startDateTime.toString();
        this.startdtime = new Date(dates);
        }
      }, error => { console.log("Something went wrong") });
    }
  }

  // Cancel fun to back/navigate to home page
  cancelFun(){
    this.router.navigate(['home']);
  }

  // Save data of timesheet 
  saveTimeSheet(){

        this.timeSheetObj.startDateTime = this.startdtime;
        if(this.timeSheetObj.id > 0){
        this.timeServiceProxy.updateTimeSheet(this.timeSheetObj).subscribe((data: any) => {
          this.timeSheetObj = data;
          this.router.navigate(['home']);
          alert("data saved successfully!!")
        }, error => { console.log("Something went wrong") });
      }else{
        this.timeServiceProxy.postTimeSheet(this.timeSheetObj).subscribe((data: any) => {
          this.timeSheetObj = data;
          alert("data saved successfully!!")
        }, error => { console.log("Something went wrong") });
      }
  }

}
interface Book {
  label: string;
  value: number;
}
