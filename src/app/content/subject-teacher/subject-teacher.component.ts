import { Component, OnInit }          from '@angular/core';
import { Router }                     from '@angular/router';
import { Clas }                       from '../class/clas';
import { Section }			              from '../section/section';
import { SubjectTeacher }		          from './subject-teacher'
import { ClassService }               from '../class/class.service';
import { SectionService }		          from '../section/section.service';
import { SubjectTeacherService }      from './subject-teacher.service';
import { CookieService }		          from 'angular2-cookie/core';

@Component({
  selector: 'ui-subject-teacher',
  templateUrl: './subject-teacher.component.html',
  styleUrls: ['./subject-teacher.component.css']
})

export class SubjectTeacherComponent implements OnInit {
  classes: Clas[];
  selectedClass: Clas;
  sections: Section[];
  selectedSection: Section;
  subjectTeachers: SubjectTeacher[];
  selectedSubjectTeacher: SubjectTeacher;
  addingSubjectTeacher = false;
  error: any;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private classService: ClassService,
    private sectionService: SectionService,
    private subjectTeacherService: SubjectTeacherService) { 
  }

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
    this.getSections(this.selectedClass.id);
    this.cookieService.put("classId", "" + this.selectedClass.id);
    this.cookieService.put("className", this.selectedClass.className);
    this.addingSubjectTeacher = true;
    this.subjectTeachers = null;
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
    this.getSubjectTeachers(this.selectedSection.id);
    this.cookieService.put("sectionId", "" + this.selectedSection.id);
    this.cookieService.put("sectionName", this.selectedSection.sectionName);
  }

  getSubjectTeachers(id: number) {
    this.subjectTeacherService
      .getSubjectTeachers(id)
      .then(subjectTeachers => this.subjectTeachers = subjectTeachers)
      .catch(error => this.error = error);
  }

  onSelect(subjectTeacher: SubjectTeacher) {
    this.selectedSubjectTeacher = subjectTeacher;
    this.addingSubjectTeacher = false;
  }

  close(savedSubjectTeacher: SubjectTeacher) {
    this.addingSubjectTeacher = false;
    //if (savedSubjectTeacher) { this.getSubjectTeachers(this.selectedSection.id); }
  }

  setupSubjectTeacher() {
    this.subjectTeacherService.save(this.selectedClass);
  }

  gotoEdit(subjectTeacher: SubjectTeacher, event: any) {
    event.stopPropagation();
    this.router.navigate(['subject-teacher/edit', subjectTeacher.id]);
  }

  deleteSubjectTeacher(subjectTeacher: SubjectTeacher, event: any) {
    event.stopPropagation();
    this.subjectTeacherService
      .delete(subjectTeacher)
      .then(res => {
        this.subjectTeachers = this.subjectTeachers.filter(h => h !== subjectTeacher);
        if (this.selectedSubjectTeacher === subjectTeacher) { this.selectedSubjectTeacher = null; }
      })
      .catch(error => this.error = error);
  }

}