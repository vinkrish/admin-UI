"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var clas_1 = require('../class/clas');
var section_1 = require('../section/section');
var class_service_1 = require('../class/class.service');
var section_service_1 = require('../section/section.service');
var subject_teacher_service_1 = require('./subject-teacher.service');
var core_2 = require('angular2-cookie/core');
var SubjectTeacherComponent = (function () {
    function SubjectTeacherComponent(router, cookieService, classService, sectionService, subjectTeacherService) {
        this.router = router;
        this.cookieService = cookieService;
        this.classService = classService;
        this.sectionService = sectionService;
        this.subjectTeacherService = subjectTeacherService;
        this.addingSubjectTeacher = false;
    }
    SubjectTeacherComponent.prototype.ngOnInit = function () {
        this.getClasses();
        this.selectedClass = new clas_1.Clas(0, "");
        this.selectedSection = new section_1.Section(0, "");
    };
    SubjectTeacherComponent.prototype.getClasses = function () {
        var _this = this;
        this.classService
            .getClasses()
            .then(function (classes) { return _this.classes = classes; })
            .catch(function (error) { return _this.error = error; });
    };
    SubjectTeacherComponent.prototype.classSelected = function (classId) {
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
    };
    SubjectTeacherComponent.prototype.getSections = function (id) {
        var _this = this;
        this.sectionService
            .getSections(id)
            .then(function (sections) { return _this.sections = sections; })
            .catch(function (error) { return _this.error = error; });
    };
    SubjectTeacherComponent.prototype.sectionSelected = function (sectionId) {
        for (var i = 0; i < this.sections.length; i++) {
            if (this.sections[i].id == sectionId) {
                this.selectedSection = this.sections[i];
            }
        }
        this.getSubjectTeachers(this.selectedSection.id);
        this.cookieService.put("sectionId", "" + this.selectedSection.id);
        this.cookieService.put("sectionName", this.selectedSection.sectionName);
    };
    SubjectTeacherComponent.prototype.getSubjectTeachers = function (id) {
        var _this = this;
        this.subjectTeacherService
            .getSubjectTeachers(id)
            .then(function (subjectTeachers) { return _this.subjectTeachers = subjectTeachers; })
            .catch(function (error) { return _this.error = error; });
    };
    SubjectTeacherComponent.prototype.onSelect = function (subjectTeacher) {
        this.selectedSubjectTeacher = subjectTeacher;
        this.addingSubjectTeacher = false;
    };
    SubjectTeacherComponent.prototype.close = function (savedSubjectTeacher) {
        this.addingSubjectTeacher = false;
        //if (savedSubjectTeacher) { this.getSubjectTeachers(this.selectedSection.id); }
    };
    SubjectTeacherComponent.prototype.setupSubjectTeacher = function () {
        this.subjectTeacherService.save(this.selectedClass);
    };
    SubjectTeacherComponent.prototype.gotoEdit = function (subjectTeacher, event) {
        event.stopPropagation();
        this.router.navigate(['subject-teacher/edit', subjectTeacher.id]);
    };
    SubjectTeacherComponent.prototype.deleteSubjectTeacher = function (subjectTeacher, event) {
        var _this = this;
        event.stopPropagation();
        this.subjectTeacherService
            .delete(subjectTeacher)
            .then(function (res) {
            _this.subjectTeachers = _this.subjectTeachers.filter(function (h) { return h !== subjectTeacher; });
            if (_this.selectedSubjectTeacher === subjectTeacher) {
                _this.selectedSubjectTeacher = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    SubjectTeacherComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-subject-teacher',
            templateUrl: 'subject-teacher.component.html',
            styleUrls: ['subject-teacher.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_2.CookieService, class_service_1.ClassService, section_service_1.SectionService, subject_teacher_service_1.SubjectTeacherService])
    ], SubjectTeacherComponent);
    return SubjectTeacherComponent;
}());
exports.SubjectTeacherComponent = SubjectTeacherComponent;
//# sourceMappingURL=subject-teacher.component.js.map