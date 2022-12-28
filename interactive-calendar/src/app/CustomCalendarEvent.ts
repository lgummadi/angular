import {
    CalendarEvent    
  } from 'angular-calendar';

export interface CustomCalendarEvent extends CalendarEvent {
    requesterName: string;
    eventName: string;
    status:string;
    eventId: number;
  }