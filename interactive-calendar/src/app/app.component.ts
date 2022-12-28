import { Component } from '@angular/core';
import {CustomCalendarEvent} from './CustomCalendarEvent';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'interactive-calendar';
  viewDate: Date = new Date();
  currentDate:string = this.datePipe.transform( new Date(),'MM-dd-yyyy');

  refresh = new Subject<void>();
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  constructor(private datePipe: DatePipe){
  };

   actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };    
  }

  events: CustomCalendarEvent[] = [
    {
      eventId:0,
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      requesterName: 'Rob', 
      status:'Pending',
      title:'',    
      actions: this.actions,
      eventName: 'schedule1',
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,     
    },
    {
      eventId:1,
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      requesterName: 'John', 
      status:'Pending',
      title:'',    
      actions: this.actions,
      eventName: 'schedule3',
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,     
    },
    {
      eventId:2,
      start: startOfDay(new Date()),
      requesterName: 'Smith', 
      status:'Pending',
      eventName:'schedule2',
      title: 'An event with no end date',    
      actions: this.actions,
    },
    {
      eventId:3,
      start: subDays(startOfDay(new Date()), 2),
      end: addDays(new Date(), 1),
      requesterName: 'Smith', 
      status:'Pending',
      eventName:'schedule2',
      title: 'An event with no end date',    
      actions: this.actions,
    },
    {
      eventId:4,
      start: subDays(startOfDay(new Date()), 3),
      end: addDays(new Date(), 1),
      requesterName: 'Smith', 
      status:'Pending',
      eventName:'schedule2',
      title: 'An event with no end date',    
      actions: this.actions,
    }
  ];

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {    
    this.currentDate = this.datePipe.transform(date,'MM-dd-yyyy'); 
    this.viewDate = date;
        
  }

  chkevent(event: CustomCalendarEvent)
  { 
   
     return this.datePipe.transform(event.start,'MM-dd-yyyy') == this.currentDate;
  }
  approveEvent(eventToApprove: CustomCalendarEvent) {
    const targetIdx = this.events.map(item => item.eventId).indexOf(eventToApprove.eventId);
    this.events[targetIdx]= eventToApprove;
    this.events[targetIdx].status = "Approved";
   
  }

  addEvent(): void {
    console.log(this.currentDate);
    
    this.events = [
      ...this.events,
      {
        
        eventId:Math.max(...this.events.map(o => o.eventId), 0) + 1,
        title: 'New event',
        start: new Date( this.currentDate),
        end: endOfDay(new Date()),
        requesterName:'',
        eventName:'',
        status:'pending',
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
    console.log(this.events);
  }

  
}
