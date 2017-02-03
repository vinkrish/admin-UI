import { Component, OnInit }   from '@angular/core';
import { Router }              from '@angular/router';
import { Clas }                from '../class/clas';
import { Section }             from '../section/section';
import { ClassService }        from '../class/class.service';
import { SectionService }      from '../section/section.service';
import { Exam }                from '../exam/exam';
import { ExamService }         from '../exam/exam.service';
import { ExamSubject }         from '../exam-subject/exam-subject';
import { ExamSubjectService }  from '../exam-subject/exam-subject.service';
import { Activity }            from '../activity/activity';
import { ActivityService }     from '../activity/activity.service';
import { SubActivity }         from './subactivity';
import { SubActivityService }  from './subactivity.service';

@Component({
  selector: 'ui-subactivity',
  templateUrl: './subactivity.component.html',
  styleUrls: ['./subactivity.component.css']
})

export class SubActivityComponent implements OnInit {
  classes: Clas[];
  selectedClass: Clas;
  sections: Section[];
  selectedSection: Section;
  exams: Exam[];
  selectedExam: Exam;
  examSubjects: ExamSubject[];
  selectedExamSubject: ExamSubject;
  activities: Activity[];
  selectedActivity: Activity;
  subActivity: SubActivity;
  subActivities: SubActivity[];
  selectedSubActivity: SubActivity;
  addingSubActivity = false;
  error: any;

  constructor(
    private router: Router,
    private classService: ClassService,
    private sectionService: SectionService,
    private examService: ExamService,
    private examSubjectService: ExamSubjectService,
    private activityService: ActivityService,
    private subActivityService: SubActivityService) { 
  }

  ngOnInit() {
    this.getClasses();
    this.selectedClass = new Clas();
    this.selectedSection = new Section();
    this.selectedExam = new Exam();
    this.selectedExamSubject = new ExamSubject();
    this.selectedActivity = new Activity();
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
    this.subActivities = null;
    this.selectedSection = new Section();
    this.selectedExam = new Exam();
    this.selectedExamSubject = new ExamSubject();
    this.selectedActivity = new Activity();
    this.getSections(this.selectedClass.id);
    this.getExams(this.selectedClass.id);
    this.addingSubActivity = false;
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
    this.selectedActivity = new Activity();
    this.activities = null;
    this.subActivities = null;
    this.addingSubActivity = false;
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
    this.activities = null;
    this.subActivities = null;
    this.getExamSubjects(this.selectedExam.id);
    this.addingSubActivity = false;
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
    this.subActivities = null;
    this.getActivities();
    this.addingSubActivity = false;
  }

  getActivities() {
    this.activityService
      .getActivities(this.selectedSection.id, this.selectedExam.id, this.selectedExamSubject.subjectId)
      .then(activities => this.activities = activities)
      .catch(error => this.error = error);
  }

  activitySelected(activityId) {
    for (var i = 0; i < this.activities.length; i++) {
      if (this.activities[i].id == activityId) {
        this.selectedActivity = this.activities[i];
      }
    }
    this.subActivities = null;
    this.getSubActivities();
    this.addingSubActivity = false;
  }

  getSubActivities() {
    this.subActivityService
      .getSubActivities(this.selectedActivity.id)
      .then(subActivities => this.subActivities = subActivities)
      .catch(error => this.error = error);
  }

  onSelect(subactivity: SubActivity) {
    this.selectedSubActivity = subactivity;
    this.addingSubActivity = false;
  }

  close() {
    this.addingSubActivity = false;
  }

  add() {
    if (this.selectedClass.id !== undefined && 
        this.selectedSection.id !== undefined &&
        this.selectedExam.id !== undefined &&
        this.selectedExamSubject.id !== undefined &&
        this.selectedActivity.id != undefined) {
      this.subActivity = new SubActivity();
      this.subActivity.activityId = this.selectedActivity.id;
      this.addingSubActivity = true;
    }
    this.selectedSubActivity = null;
  }

  delete(subactivity: SubActivity, event: any) {
    event.stopPropagation();
    this.subActivityService
      .delete(subactivity)
      .then(res => {
        this.subActivities = this.subActivities.filter(h => h !== subactivity);
        if (this.selectedSubActivity === subactivity) { this.selectedSubActivity = null; }
      })
      .catch(error => this.error = error);
  }

  save() {
    this.subActivityService
      .post(this.subActivity)
      .then(subactivity => {
        this.addingSubActivity = false;
        this.selectedActivity = new Activity();
        this.subActivities = null;
      })
      .catch(error => this.error = error);
  }

  update(subactivity: SubActivity, event: any){
    event.stopPropagation();
    this.subActivityService
      .save(subactivity)
      .then(() => this.getExamSubjects(this.selectedExam.id))
      .catch(error => this.error = error);
  }

}