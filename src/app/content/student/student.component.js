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
var student_service_1 = require('./student.service');
var core_2 = require('angular2-cookie/core');
var StudentComponent = (function () {
    function StudentComponent(router, cookieService, classService, sectionService, studentService) {
        this.router = router;
        this.cookieService = cookieService;
        this.classService = classService;
        this.sectionService = sectionService;
        this.studentService = studentService;
        this.selectingSection = false;
        this.addingStudent = false;
    }
    StudentComponent.prototype.ngOnInit = function () {
        this.getClasses();
        this.selectedClass = new clas_1.Clas(0, "");
        this.selectedSection = new section_1.Section(0, "");
    };
    StudentComponent.prototype.getClasses = function () {
        var _this = this;
        this.classService
            .getClasses()
            .then(function (classes) { return _this.classes = classes; })
            .catch(function (error) { return _this.error = error; });
    };
    StudentComponent.prototype.classSelected = function (classId) {
        for (var i = 0; i < this.classes.length; i++) {
            if (this.classes[i].id == classId) {
                this.selectedClass = this.classes[i];
            }
        }
        this.getSections(this.selectedClass.id);
        this.cookieService.put("classId", "" + this.selectedClass.id);
        this.cookieService.put("className", this.selectedClass.className);
        this.addingStudent = false;
        this.selectingSection = false;
        this.students = null;
    };
    StudentComponent.prototype.getSections = function (id) {
        var _this = this;
        this.sectionService
            .getSections(id)
            .then(function (sections) { return _this.sections = sections; })
            .catch(function (error) { return _this.error = error; });
    };
    StudentComponent.prototype.sectionSelected = function (sectionId) {
        for (var i = 0; i < this.sections.length; i++) {
            if (this.sections[i].id == sectionId) {
                this.selectedSection = this.sections[i];
            }
        }
        this.getStudents(this.selectedSection.id);
        this.cookieService.put("sectionId", "" + this.selectedSection.id);
        this.cookieService.put("sectionName", this.selectedSection.sectionName);
        this.addingStudent = false;
        this.selectingSection = true;
    };
    StudentComponent.prototype.getStudents = function (id) {
        var _this = this;
        this.studentService
            .getStudents(id)
            .then(function (students) { return _this.students = students; })
            .catch(function (error) { return _this.error = error; });
    };
    StudentComponent.prototype.onSelect = function (student) {
        this.selectedStudent = student;
        this.addingStudent = false;
    };
    StudentComponent.prototype.close = function (savedStudent) {
        this.addingStudent = false;
        if (savedStudent) {
            this.getStudents(this.selectedSection.id);
        }
    };
    StudentComponent.prototype.addStudent = function () {
        if (this.selectingSection) {
            if (this.addingStudent) {
                this.addingStudent = false;
            }
            else {
                this.addingStudent = true;
            }
        }
        this.selectedStudent = null;
    };
    StudentComponent.prototype.gotoEdit = function (student, event) {
        event.stopPropagation();
        this.router.navigate(['student/edit', student.id]);
    };
    StudentComponent.prototype.deleteStudent = function (student, event) {
        var _this = this;
        event.stopPropagation();
        this.studentService
            .delete(student)
            .then(function (res) {
            _this.students = _this.students.filter(function (h) { return h !== student; });
            if (_this.selectedStudent === student) {
                _this.selectedStudent = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    StudentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-student',
            templateUrl: 'student.component.html',
            styleUrls: ['student.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_2.CookieService, class_service_1.ClassService, section_service_1.SectionService, student_service_1.StudentService])
    ], StudentComponent);
    return StudentComponent;
}());
exports.StudentComponent = StudentComponent;
//# sourceMappingURL=student.component.js.map