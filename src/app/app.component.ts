import { Component, OnInit } from '@angular/core';
import { FetchService } from './fetch.service';
 interface IweekDays {
  date:string
  day:string
  today:string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  inpString:string = '';
  selectedName = ''
  showSuggestion:boolean = false;
  weekDays = []
  currWeek:IweekDays[] = []
  constructor(private fetch:FetchService) {}
  employeeList = this.fetch.getScheduleMeeting();
  // meetingList = this.fetch.getScheduleMeeting();
  schedule = this.fetch.getScheduleMeeting();
  title = 'meeting-room-clone';
  ngOnInit(): void {
      console.log('schedule is: ', this.schedule);
      this.getWeek();
  }
  getWeek = () => {
    const weekDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    let today = new Date();
    for (let i = 1; i <= 7; i++) {
     // console.log('check = ',new Date(today.setDate(today.getDate() - today.getDay() + i)).toISOString().slice(0, 10)); 
      let day = new Date(today.setDate(today.getDate() - today.getDay() + i)).toLocaleString().slice(0, 10);
      this.currWeek.push({date:day.slice(0,2),day:weekDays[new Date().getDay()+i-1],today:day})
    }
    console.log('currweek = ',this.currWeek);
    console.log('scheduleDay = ',this.schedule[0].meetings[0].startTime.split(',')[0]);
  }
  enableSuggestion = () => {
    if(this.inpString.length > 2) {
      this.showSuggestion = true;
    }
  }
  onSelect = (name:string) => {
    this.showSuggestion = false;
    this.selectedName = name;
  }
  reset() {
    this.selectedName=''
  }
  sortByName = () => {
    this.schedule.sort((a,b) => {
      if(a.employeeName.toLowerCase() < b.employeeName.toLowerCase())
      return -1;
      else
      return 1;
     
    })
  }

}
