import { Component, OnInit } 	from '@angular/core';
import { Router }            	from '@angular/router';
import { Clas }               from '../class/clas';
import { Section }            from '../section/section';
import { ClassService }       from '../class/class.service';
import { SectionService }     from '../section/section.service';
import { Exam }			 		      from '../exam/exam';
import { ExamService }		 	  from '../exam/exam.service';
import { ExamSubject }         from '../exam-subject/exam-subject';
import { ExamSubjectService }  from '../exam-subject/exam-subject.service';
import { Activity }            from './activity';
import { ActivityService }     from './activity.service';

@Component({
	selector: 'ui-activity',
	templateUrl: './activity.component.html',
	styleUrls: ['./activity.component.css']
})

export class ActivityComponent implements OnInit {
  classes: Clas[];
  selectedClass: Clas;
  sections: Section[];
  selectedSection: Section;
  exams: Exam[];
  selectedExam: Exam;
  examSubjects: ExamSubject[];
  selectedExamSubject: ExamSubject;
  activity: Activity;
  activities: Activity[];
  selectedActivity: Activity;
  addingActivity = false;
  error: any;

  constructor(
    private router: Router,
    private classService: ClassService,
    private sectionService: SectionService,
    private examService: ExamService,
    private examSubjectService: ExamSubjectService,
    private activityService: ActivityService) { 
  }

  ngOnInit() {
    this.getClasses();
    this.selectedClass = new Clas();
    this.selectedSection = new Section();
    this.selectedExam = new Exam();
    this.selectedExamSubject = new ExamSubject();
  }

  getClasses() {
    this.classService
      .getClasses()
      .then(classes => this.classes = classes)
      .catch(error => this.error = error);
    }

  classSelected(classId) {
    this.examSubjects = null;
    for (var i = 0; i < this.classes.length; i++) {
      if (this.classes[i].id == classId) {
        this.selectedClass = this.classes[i];
      }
    }
    this.activities = null;
    this.selectedSection = new Section();
    this.selectedExam = new Exam();
    this.selectedExamSubject = new ExamSubject();
    this.getSections(this.selectedClass.id);
    this.getExams(this.selectedClass.id);
    this.addingActivity = false;
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
    this.selectedExamSubject = new ExamSubject();
    this.activities = null;
    this.addingActivity = false;
  }

  getExams(id: number) {
    this.examService
      .getExams(id)
      .then(exams => this.exams = exams)
      .catch(error => this.error = error);
  }

  examSelected(examId){
    this.examSubjects = null;
    for (var i = 0; i < this.exams.length; i++) {
      if (this.exams[i].id == examId) {
        this.selectedExam = this.exams[i];
      }
    }
    this.selectedExamSubject = new ExamSubject();
    this.activities = null;
    this.getExamSubjects(this.selectedExam.id);
    this.addingActivity = false;
  }

  getExamSubjects(id: number) {
    this.examSubjectService
      .getExamSubjects(id)
      .then(examSubjects => this.examSubjects = examSubjects)
      .catch(error => this.error = error)
  }

  examSubjectSelected(subjectId) {
    for (var i = 0; i < this.examSubjects.length; i++) {
      if (this.examSubjects[i].subjectId == subjectId) {
        this.selectedExamSubject = this.examSubjects[i];
      }
    }
    this.activities = null;
    this.getActivities();
    this.addingActivity = false;
  }

  getActivities() {
    this.activityService
      .getActivities(this.selectedSection.id, this.selectedExam.id, this.selectedExamSubject.subjectId)
      .then(activities => this.activities = activities)
      .catch(error => this.error = error);
  }

  onSelect(activity: Activity) {
    this.selectedActivity = activity;
    this.addingActivity = false;
  }

  close() {
    this.addingActivity = false;
  }

  add() {
    if (this.selectedClass.id !== undefined && 
        this.selectedSection.id !== undefined &&
        this.selectedExam.id !== undefined &&
        this.selectedExamSubject.id !== undefined) {
      this.activity = new Activity();
      this.activity.sectionId = this.selectedSection.id;
      this.activity.examId = this.selectedExam.id;
      this.activity.subjectId = this.selectedExamSubject.subjectId;
      this.addingActivity = true;
    }
    this.selectedActivity = null;
  }

  delete(activity: Activity, event: any) {
    event.stopPropagation();
    this.activityService
      .delete(activity)
      .then(res => {
        this.activities = this.activities.filter(h => h !== activity);
        if (this.selectedActivity === activity) { this.selectedActivity = null; }
      })
      .catch(error => this.error = error);
  }

  save() {
    this.activityService
      .post(this.activity)
      .then(activity => {
        this.addingActivity = false;
        this.selectedExamSubject = new ExamSubject();
        this.activities = null;
      })
      .catch(error => this.error = error);
  }

  update(activity: Activity, event: any){
    event.stopPropagation();
    this.activityService
      .save(activity)
      .then(() => this.getExamSubjects(this.selectedExam.id))
      .catch(error => this.error = error);
  }

}