import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetCreateComponent } from './time-sheet-create.component';

describe('TimeSheetCreateComponent', () => {
  let component: TimeSheetCreateComponent;
  let fixture: ComponentFixture<TimeSheetCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSheetCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSheetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
