import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clas } from '../class/clas';
import { Section } from '../section/section';
import { SubjectTeacher } from '../subject-teacher/subject-teacher';
import { Attendance } from './attendance';
import { LeaveType } from './leave-type';
import { Session } from './session';
import { Timetable } from '../timetable/timetable';
import { TimetableService } from '../timetable/timetable.service';
import { ClassService } from '../class/class.service';
import { SectionService } from '../section/section.service';
import { AttendanceService } from './attendance.service';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'ui-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})

export class AttendanceComponent implements OnInit {
  classes: Clas[];
  selectedClass: Clas;
  sections: Section[];
  selectedSection: Section;
  selectingSection = false;
  dateAttendance: Date;
  timetables: Timetable[];
  periods: number[];
  markedAttendances: Attendance[];
  unmarkedAttendances: Attendance[];
  preparedAttendances: Attendance[];
  leaveTypes = [
	new LeaveType(""),
	new LeaveType("Absent")
  ]
  session: number;
  sessions = [
	new Session("Morning", 0),
	new Session("Afternoon", 1)
  ]
  error: any;

  constructor(
	private router: Router,
	private cookieService: CookieService,
	private classService: ClassService,
	private sectionService: SectionService,
	private timetableService: TimetableService,
	private attendanceService: AttendanceService) { }

  ngOnInit() {
	this.getClasses();
	this.selectedClass = new Clas(0, "");
	this.selectedSection = new Section(0, "");
  }

  getClasses() {
	this.classService
	  .getClasses()
	  .then(classes => this.classes = classes)
	  .catch(error => this.error = error);
  }

  classSelected(classId) {
	for (var i = 0; i < this.classes.length; i++) {
	  if (this.classes[i].id == classId) {
		this.selectedClass = this.classes[i];
	  }
	}
	this.timetables = [];
	this.periods = [];
	this.getSections(this.selectedClass.id);
	this.cookieService.put("classId", "" + this.selectedClass.id);
	this.cookieService.put("className", this.selectedClass.className);
	this.selectingSection = false;
	this.markedAttendances = null;
	this.unmarkedAttendances = null;
  }

  getSections(id: number) {
	this.sectionService
	  .getSections(id)
	  .then(sections => this.sections = sections)
	  .catch(error => this.error = error);
  }

  sectionSelected(sectionId) {
	for (var i = 0; i < this.sections.length; i++) {
	  if (this.sections[i].id == sectionId) {
		this.selectedSection = this.sections[i];
	  }
	}
	this.timetables = [];
	this.periods = [];
	this.cookieService.put("sectionId", "" + this.selectedSection.id);
	this.cookieService.put("sectionName", this.selectedSection.sectionName);
	this.getTimetable(this.selectedSection.id);
	this.selectingSection = true;
	this.markedAttendances = null;
	this.unmarkedAttendances = null;
  }

  getTimetable(sectionId: number) {
	this.timetableService
	  .getTimetables(sectionId)
	  .then(timetables => {
		this.timetables = timetables;
		this.getPeriods();
	  })
	  .catch(error => this.error = error);
  }

  getPeriods() {
	for (let timetable of this.timetables) {
	  this.periods.push(timetable.periodNo);
	}
  }

  fetchAttendance() {
	this.markedAttendances = [];
	this.unmarkedAttendances = [];
	this.getMarkedAttendance(this.selectedSection.id, this.dateAttendance);
	this.getUnmarkedAttendance(this.selectedSection.id, this.dateAttendance);
  }

  fetchSessionAttendance() {
	this.markedAttendances = [];
	this.unmarkedAttendances = [];
	this.getMarkedSessionAttendance(this.session, this.selectedSection.id, this.dateAttendance);
	this.getUnmarkedSessionAttendance(this.session, this.selectedSection.id, this.dateAttendance);
  }

  delete(attendance: Attendance, event: any) {
	event.stopPropagation();
	this.attendanceService
	  .delete(attendance)
	  .then(() => {
		if (this.selectedClass.attendanceType == 'Daily') {
		  this.fetchAttendance();
		} else if (this.selectedClass.attendanceType == 'Session') {
		  this.fetchSessionAttendance();
		} else if (this.selectedClass.attendanceType == 'Period') {
		  this.fetchSessionAttendance();
		}
	  })
	  .catch(error => this.error = error);
  }

  prepareMarkedAttendance() {
	for (let att of this.unmarkedAttendances) {
	  if (att.typeOfLeave == 'Absent') {
		this.preparedAttendances.push(att);
	  }
	}
  }

  save() {
	event.stopPropagation();
	this.preparedAttendances = [];
	this.prepareMarkedAttendance();
	this.attendanceService
	  .post(this.preparedAttendances)
	  .then(() => {
		if (this.selectedClass.attendanceType == 'Daily') {
		  this.fetchAttendance();
		} else if (this.selectedClass.attendanceType == 'Session') {
		  this.fetchSessionAttendance();
		} else if (this.selectedClass.attendanceType == 'Period') {
		  this.fetchSessionAttendance();
		}
	  })
	  .catch(error => this.error = error);
  }

  getMarkedAttendance(sectionId: number, date: Date) {
	this.attendanceService
	  .dailyAttendanceMarked(sectionId, date)
	  .then(attendances => {
		this.markedAttendances = attendances;
	  })
	  .catch(error => this.error = error)
  }

  getUnmarkedAttendance(sectionId: number, date: Date) {
	this.attendanceService
	  .dailyAttendanceUnmarked(sectionId, date)
	  .then(attendances => {
		this.unmarkedAttendances = attendances;
	  })
	  .catch(error => this.error = error)
  }

  getMarkedSessionAttendance(session: number, sectionId: number, date: Date) {
	this.attendanceService
	  .sessionAttendanceMarked(session, sectionId, date)
	  .then(attendances => {
		this.markedAttendances = attendances;
	  })
	  .catch(error => this.error = error)
  }

  getUnmarkedSessionAttendance(session: number, sectionId: number, date: Date) {
	this.attendanceService
	  .sessionAttendanceUnmarked(session, sectionId, date)
	  .then(attendances => {
		this.unmarkedAttendances = attendances;
	  })
	  .catch(error => this.error = error)
  }

}