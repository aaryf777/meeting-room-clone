import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  @Input() currWeek:any[] = []
  //currWeek:any[] = []
  constructor() { }
  ngOnInit(): void {
    //this.getWeek();
  }

}
