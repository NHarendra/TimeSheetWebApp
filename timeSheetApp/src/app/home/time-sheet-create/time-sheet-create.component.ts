import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimeSheetDto, TimeSheetDtoObject, TimesheetService } from 'src/app/timesheet.service';

@Component({
  selector: 'app-time-sheet-create',
  templateUrl: './time-sheet-create.component.html',
  styleUrls: ['./time-sheet-create.component.css']
})
export class TimeSheetCreateComponent implements OnInit {

  books: Book[];
  timeSheetObj = <TimeSheetDto>{};
  selectedBook: string;
  
  //Constructor Call
  constructor(private router: Router, private timeServiceProxy: TimesheetService) { }

  ngOnInit() {
    this.books = [
      {label: 'Book1', value: 1},
      {label: 'Book2', value: 1},
      {label: 'Book3', value: 1},
      {label: 'Book4', value: 1},
      {label: 'Book5', value: 1}
  ];
  }

  // Cancel fun to back/navigate to home page
  cancelFun(){
    this.router.navigate(['home']);
  }

  // Save data of timesheet 
  saveTimeSheet(){
        this.timeServiceProxy.postTimeSheet(this.timeSheetObj).subscribe((data: any) => {
          this.timeSheetObj = data;
          alert("data saved successfully!!")
        }, error => { console.log("Something went wrong") });
  }

}
interface Book {
  label: string;
  value: number;
}
