import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';
import { Clas }                     from '../class/clas';
import { Section }                  from '../section/section';
import { Sliptest }			            from './sliptest';
import { SliptestService }		      from './sliptest.service';
import { ClassService }             from '../class/class.service';
import { SectionService }           from '../section/section.service';
import { ClassSubjectGroup }        from '../class-subject-group/class-subject-group';
import { ClassSubjectGroupService } from '../class-subject-group/class-subject-group.service';
import { SubjectGroupSubject }      from '../subject-group-subject/subject-group-subject'
import { SubjectGroupSubjectService }  from '../subject-group-subject/subject-group-subject.service';
import { CookieService }            from 'angular2-cookie/core';

@Component({
  selector: 'ui-sliptest',
  templateUrl: './sliptest.component.html',
  styleUrls: ['./sliptest.component.css']
})

export class SliptestComponent implements OnInit {
  classes: Clas[];
  selectedClass: Clas;
  sections: Section[];
  selectedSection: Section;
  classSubjectGroups: ClassSubjectGroup[];
  selectedCSG: ClassSubjectGroup;
  subjectGroupSubjects: SubjectGroupSubject[];
  selectedSGS: SubjectGroupSubject;
  sliptests: Sliptest[];
  selectedSliptest: Sliptest;
  addingSliptest = false;
  error: any;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private classService: ClassService,
    private sectionService: SectionService,
    private csgService: ClassSubjectGroupService,
    private sgsService: SubjectGroupSubjectService,
    private sliptestService: SliptestService) { 
  }

  ngOnInit() {
    this.getClasses();
    this.selectedClass = new Clas(0, "");
    this.clearValues();
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
    this.clearValues();
    this.getSections(this.selectedClass.id);
    this.getClassSubjectGroups(this.selectedClass.id);
    this.cookieService.put("classId", "" + this.selectedClass.id);
    this.cookieService.put("className", this.selectedClass.className);
    this.addingSliptest = false;
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
    this.selectedSliptest = new Sliptest();
    this.selectedSGS = new SubjectGroupSubject();
    this.sliptests = [];
    this.cookieService.put("sectionId", "" + this.selectedSection.id);
    this.cookieService.put("sectionName", this.selectedSection.sectionName);
    this.addingSliptest = false;
  }

  getClassSubjectGroups(id: number) {
    this.csgService
      .getClassSubjectGroups(id)
      .then(classSubjectGroups => this.classSubjectGroups = classSubjectGroups)
      .catch(error => this.error = error);
  }

  csgSelected(csgId){
    for (var i = 0; i < this.classSubjectGroups.length; i++) {
      if (this.classSubjectGroups[i].subjectGroupId == csgId) {
        this.selectedCSG = this.classSubjectGroups[i];
      }
    }
    this.selectedSGS = new SubjectGroupSubject();
    this.selectedSliptest = new Sliptest();
    this.subjectGroupSubjects = [];
    this.sliptests = [];
    this.getSubjectGroupSubjects(this.selectedCSG.subjectGroupId);
    this.addingSliptest = false;
  }

  getSubjectGroupSubjects(id: number) {
    this.sgsService
        .getSubjectGroupSubjects(id)
        .then(subjectGroupSubjects => this.subjectGroupSubjects = subjectGroupSubjects)
        .catch(error => this.error = error);
  }

  sgsSelected(subjectId) {
    for (var i = 0; i < this.subjectGroupSubjects.length; i++) {
      if (this.subjectGroupSubjects[i].subjectId == subjectId) {
        this.selectedSGS = this.subjectGroupSubjects[i];
      }
    }
    this.selectedSliptest = new Sliptest();
    this.sliptests = [];
    this.getSliptests();
    this.cookieService.put("subjectId", "" + this.selectedSGS.subjectId);
    this.cookieService.put("subjectName", this.selectedSGS.subjectName);
    this.addingSliptest = false;
  }

  getSliptests() {
    this.sliptestService
      .getSliptests(this.selectedSection.id, this.selectedSGS.subjectId)
      .then(sliptests => this.sliptests = sliptests)
      .catch(error => this.error = error);
  }

  clearValues(){
    this.selectedSection = new Section();
    this.selectedCSG = new ClassSubjectGroup();
    this.selectedSGS = new SubjectGroupSubject();
    this.selectedSliptest = new Sliptest();
    this.sections = [];
    this.classSubjectGroups = [];
    this.subjectGroupSubjects = [];
    this.sliptests = [];
  }

  onSelect(sliptest: Sliptest) {
    this.selectedSliptest = sliptest;
    this.addingSliptest = false;
  }

  close(savedPortion: Sliptest) {
    this.addingSliptest = false;
    if (savedPortion) { this.getSliptests(); }
  }

  addSliptest() {
    if (this.selectedClass.id !== 0 && this.selectedSection.id !== undefined &&
        this.selectedCSG.id !== undefined && this.selectedSGS.id !== undefined) {
      this.addingSliptest = true;
    }
    this.selectedSliptest = null;
  }

  gotoEdit(sliptest: Sliptest, event: any) {
    event.stopPropagation();
    this.router.navigate(['sliptest/edit', sliptest.id]);
  }

  deleteSliptest(sliptest: Sliptest, event: any) {
    event.stopPropagation();
    this.sliptestService
      .delete(sliptest)
      .then(res => {
        this.sliptests = this.sliptests.filter(h => h !== sliptest);
        if (this.selectedSliptest === sliptest) { this.selectedSliptest = null; }
      })
      .catch(error => this.error = error);
  }

}