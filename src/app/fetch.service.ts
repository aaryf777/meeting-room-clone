import { Injectable } from '@angular/core';
interface Imeetings {
  meetingName: string,
  startTime: string,
  endTime: string
}
interface Ischedule {
  employeeId: number,
  employeeName: string
  meetings: Imeetings[]
  listOfDays:string[]
}
const employees = [
  {
    employeeName: 'Aarif',
    employeeId: 1
  },
  {
    employeeName: 'Sam',
    employeeId: 2
  },
  {
    employeeName: 'Redux',
    employeeId: 3
  },
  {
    employeeName: 'hawakey',
    employeeId: 4
  },
  {
    employeeName: 'nemia',
    employeeId: 5
  },
]
const meetings = [
  {
    employeeName: 'Test User 1',
    employeeId: 1,
    meetingName: 'Demo meeting 1',
    startTime: 1640061050000,
    endTime: 1640062850000
  },
  {
    employeeName: 'Test User 2',
    employeeId: 2,
    meetingName: 'Demo meeting 1',
    startTime: 1640061050000,
    endTime: 1640062850000
  },
  {
    employeeName: 'Test User 2',
    employeeId: 2,
    meetingName: 'Demo meeting 2',
    startTime: 1640151050000,
    endTime: 1640153750000
  },
  {
    employeeName: 'Test User 3',
    employeeId: 3,
    meetingName: 'Demo meeting 3',
    startTime: 1640316650000,
    endTime: 1640320250000
  },
  {
    employeeName: 'Test User 4',
    employeeId: 4,
    meetingName: 'Demo meeting 4',
    startTime: 1640502050000,
    endTime: 1640505650000
  },
  {
    employeeName: 'Test User 1',
    employeeId: 1,
    meetingName: 'Demo meeting 5',
    startTime: 1640427350000,
    endTime: 1640430050000
  },
  {
    employeeName: 'Test User 3',
    employeeId: 3,
    meetingName: 'Demo meeting 6',
    startTime: 1640328350000,
    endTime: 1640330150000
  }
]
@Injectable({
  providedIn: 'root'
})
export class FetchService {
  schedule: Ischedule[] = []
  scheduleMeeting = () => {
    this.schedule = []
    employees.forEach(emp => {
      let haveMeet = false
      meetings.forEach(meet => {
        if (emp.employeeId === meet.employeeId) {
          haveMeet = true
          const { employeeId, employeeName } = emp;
          const { meetingName, startTime, endTime } = meet;
          let ind = this.schedule.findIndex(s => s.employeeId === meet.employeeId)
          if(ind === -1) {
            const obj = {
              employeeId, employeeName, meetings:[{meetingName, startTime:this.toDateTime(startTime), endTime:this.toDateTime(endTime)}],listOfDays:[this.toDateTime(startTime).split(',')[0]]
            }
            this.schedule.push(obj);
          }
          else {
            this.schedule[ind].meetings.push({meetingName, startTime:this.toDateTime(startTime), endTime:this.toDateTime(endTime)})
            this.schedule[ind].listOfDays.push(this.toDateTime(startTime).split(',')[0])
          }
        }
      })
      if(!haveMeet) {
        const { employeeId, employeeName } = emp;
        const obj = {
          employeeId, employeeName, meetings:[],listOfDays:[]
        }
        this.schedule.push(obj);
      }
    })
  }
  constructor() { }
  getEmployees = () => {
    return employees;
  }
  getScheduleMeeting() {
    this.scheduleMeeting();
    return this.schedule;
  }
  toDateTime(epoc:number):string {
    return new Date(epoc).toLocaleString();
  }
}
