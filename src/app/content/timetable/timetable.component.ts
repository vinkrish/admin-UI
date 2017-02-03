import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clas } from '../class/clas';
import { Section } from '../section/section';
import { SubjectTeacher } from '../subject-teacher/subject-teacher';
import { Timetable } from './timetable';
import { ClassService } from '../class/class.service';
import { SectionService } from '../section/section.service';
import { TimetableService } from './timetable.service';
import { Subjects } from '../subjects/subjects';
import { SubjectsService } from '../subjects/subjects.service';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'ui-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})

export class TimetableComponent {
  classes: Clas[];
  selectedClass: Clas;
  sections: Section[];
  selectedSection: Section;
  selectingSection = false;
  newTimetable: Timetable;
  isNewTimetable: boolean = false;
  timetables: Timetable[];
  selectedTimetable: Timetable[];
  selectedDay: string;
  days: string[];
  subjects: Subjects[];
  error: any;

  constructor(
	private router: Router,
	private cookieService: CookieService,
	private classService: ClassService,
	private sectionService: SectionService,
	private timetableService: TimetableService,
	private subjectsService: SubjectsService) {
  }

  ngOnInit() {
	this.getClasses();
	this.selectedClass = new Clas(0, "");
	this.selectedSection = new Section(0, "");
	this.selectedDay = "";
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
	this.isNewTimetable = false;
	this.getSections(this.selectedClass.id);
	this.getSubjects(this.selectedClass.id);
	this.selectingSection = false;
	this.timetables = [];
	this.selectedTimetable = [];
	this.selectedDay = "";
	this.days = [];
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
	this.isNewTimetable = false;
	this.selectingSection = true;
	this.timetables = [];
	this.selectedTimetable = [];
	this.selectedDay = "";
	this.days = [];
	this.getTimetable(this.selectedSection.id);
  }

  getTimetable(sectionId: number) {
	this.timetableService
	  .getTimetables(sectionId)
	  .then(timetables => {
		this.timetables = timetables;
		this.days = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	  })
	  .catch(error => this.error = error);
  }

  daySelected(day: string) {
	this.selectedTimetable = [];
	for (let timetab of this.timetables) {
	  if (timetab.dayOfWeek == day) {
		this.selectedTimetable.push(timetab);
	  }
	}
  }

  getSubjects(id: number) {
	this.subjectsService
	  .getClassSubjects(id)
	  .then(subjects => this.subjects = subjects)
	  .catch(error => this.error = error);
  }

  save(timetable: Timetable, event: any) {
	event.stopPropagation();
	this.timetableService
	  .save(timetable)
	  .then(() => {
		// this.selectedDay = "";
		// this.days = [];
		// this.timetables = [];
		// this.selectedTimetable = [];
		// this.getTimetable(this.selectedSection.id);
	  })
	  .catch(error => this.error = error);

  }

  insert() {
	this.timetableService
	  .save(this.newTimetable)
	  .then(() => {
		this.goBack();
		this.selectedDay = "";
		this.days = [];
		this.timetables = [];
		this.selectedTimetable = [];
		this.getTimetable(this.selectedSection.id);
	  })
	  .catch(error => this.error = error);
  }

  delete(timetable: Timetable, event: any) {
	event.stopPropagation();
	this.timetableService
	  .delete(timetable)
	  .then(() => {
		this.selectedDay = "";
		this.days = [];
		this.timetables = [];
		this.selectedTimetable = [];
		this.getTimetable(this.selectedSection.id);
	  })
	  .catch(error => this.error = error);
  }

  add() {
	this.newTimetable = new Timetable();
	this.newTimetable.sectionId = this.selectedSection.id;
	this.newTimetable.dayOfWeek = this.selectedDay;
	this.enableNewTimetable();
  }

  enableNewTimetable() {
	if (this.selectedDay != "") {
	  this.isNewTimetable = true;
	}
  }

  goBack() {
	this.newTimetable = null;
	this.isNewTimetable = false;
  }

}