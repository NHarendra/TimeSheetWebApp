import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-sheet-create',
  templateUrl: './time-sheet-create.component.html',
  styleUrls: ['./time-sheet-create.component.css']
})
export class TimeSheetCreateComponent implements OnInit {

  books: Book[];
  selectedBook: string;
  constructor() { }

  ngOnInit() {
    this.books = [
      {name: 'Book1', id: 1},
      {name: 'Book2', id: 1},
      {name: 'Book3', id: 1},
      {name: 'Book4', id: 1},
      {name: 'Book5', id: 1}
  ];
  }

}
interface Book {
  name: string;
  id: number;
}
