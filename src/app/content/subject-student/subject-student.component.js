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
var student_service_1 = require('../student/student.service');
var class_subject_group_1 = require('../class-subject-group/class-subject-group');
var class_subject_group_service_1 = require('../class-subject-group/class-subject-group.service');
var subject_group_subject_1 = require('../subject-group-subject/subject-group-subject');
var subject_group_subject_service_1 = require('../subject-group-subject/subject-group-subject.service');
var subject_students_1 = require('./subject-students');
var subject_student_1 = require('./subject-student');
var subject_student_service_1 = require('./subject-student.service');
var core_2 = require('angular2-cookie/core');
var SubjectStudentComponent = (function () {
    function SubjectStudentComponent(router, cookieService, classService, sectionService, studentService, csgService, sgsService, ssService) {
        this.router = router;
        this.cookieService = cookieService;
        this.classService = classService;
        this.sectionService = sectionService;
        this.studentService = studentService;
        this.csgService = csgService;
        this.sgsService = sgsService;
        this.ssService = ssService;
    }
    SubjectStudentComponent.prototype.ngOnInit = function () {
        this.getClasses();
        this.selectedClass = new clas_1.Clas(0, "");
        this.clearValues();
    };
    SubjectStudentComponent.prototype.getClasses = function () {
        var _this = this;
        this.classService
            .getClasses()
            .then(function (classes) { return _this.classes = classes; })
            .catch(function (error) { return _this.error = error; });
    };
    SubjectStudentComponent.prototype.classSelected = function (classId) {
        for (var i = 0; i < this.classes.length; i++) {
            if (this.classes[i].id == classId) {
                this.selectedClass = this.classes[i];
            }
        }
        this.clearValues();
        this.getSections(this.selectedClass.id);
        this.getClassSubjectGroups(this.selectedClass.id);
    };
    SubjectStudentComponent.prototype.getSections = function (id) {
        var _this = this;
        this.sectionService
            .getSections(id)
            .then(function (sections) { return _this.sections = sections; })
            .catch(function (error) { return _this.error = error; });
    };
    SubjectStudentComponent.prototype.sectionSelected = function (sectionId) {
        for (var i = 0; i < this.sections.length; i++) {
            if (this.sections[i].id == sectionId) {
                this.selectedSection = this.sections[i];
            }
        }
        this.getStudents(this.selectedSection.id);
    };
    SubjectStudentComponent.prototype.getClassSubjectGroups = function (id) {
        var _this = this;
        this.csgService
            .getClassSubjectGroups(id)
            .then(function (clasSubjectGroups) { return _this.clasSubjectGroups = clasSubjectGroups; })
            .catch(function (error) { return _this.error = error; });
    };
    SubjectStudentComponent.prototype.subjectGroupSelected = function (subjectGroupId) {
        //this.selectedClass = null;
        for (var i = 0; i < this.clasSubjectGroups.length; i++) {
            if (this.clasSubjectGroups[i].subjectGroupId == subjectGroupId) {
                this.selectedCSG = this.clasSubjectGroups[i];
            }
        }
        this.getSubjectGroupSubjects(this.selectedCSG.subjectGroupId);
        this.getSubjectStudents();
    };
    SubjectStudentComponent.prototype.getSubjectGroupSubjects = function (id) {
        var _this = this;
        this.sgsService
            .getSubjectGroupSubjects(id)
            .then(function (subjectGroupSubjects) {
            _this.subjectGroupSubjects = subjectGroupSubjects;
        })
            .catch(function (error) { return _this.error = error; });
    };
    SubjectStudentComponent.prototype.subjectGroupSubjectSelected = function (sgsId) {
        for (var i = 0; i < this.subjectGroupSubjects.length; i++) {
            if (this.subjectGroupSubjects[i].subjectId == sgsId) {
                this.selectedSGS = this.subjectGroupSubjects[i];
            }
        }
        for (var i = 0; i < this.ssList.length; i++) {
            this.ssList[i].subjectId = sgsId;
        }
    };
    SubjectStudentComponent.prototype.getStudents = function (id) {
        var _this = this;
        this.studentService
            .getStudents(id)
            .then(function (students) {
            _this.students = students;
            _this.ssList = [];
            for (var i = 0; i < _this.students.length; i++) {
                _this.ssList.push(new subject_student_1.SubjectStudent(_this.students[i].rollNo, _this.students[i].id, _this.students[i].studentName));
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    SubjectStudentComponent.prototype.getSubjectStudents = function () {
        var _this = this;
        this.ssService
            .getSubjectStudents(this.selectedSection.id, this.selectedCSG.subjectGroupId)
            .then(function (subjectStudents) {
            _this.subjectStudents = subjectStudents;
            _this.UpdateSubjectStudentsView();
        })
            .catch(function (error) { return _this.error = error; });
    };
    SubjectStudentComponent.prototype.UpdateSubjectStudentsView = function () {
        for (var i = 0; i < this.subjectStudents.length; i++) {
            //var ids: number[] = this.subjectStudents[i].studentIds.split(",");
            var intIds = this.subjectStudents[i].studentIds.split(",").map(Number).filter(Boolean);
            for (var _i = 0, intIds_1 = intIds; _i < intIds_1.length; _i++) {
                var ids = intIds_1[_i];
                for (var j = 0; j < this.ssList.length; j++) {
                    if (this.ssList[j].studentId == ids) {
                        this.ssList[j].subjectId = this.subjectStudents[i].subjectId;
                    }
                }
            }
        }
    };
    SubjectStudentComponent.prototype.clearValues = function () {
        this.selectedSection = new section_1.Section(0, "");
        this.selectedCSG = new class_subject_group_1.ClassSubjectGroup();
        this.subjectStudents = [];
        this.ssList = [];
        this.subjectGroupSubjects = [];
        this.selectedSGS = new subject_group_subject_1.SubjectGroupSubject();
        this.subjectStudentsEdit = [];
        this.students = [];
    };
    SubjectStudentComponent.prototype.updateMapping = function () {
        for (var i = 0; i < this.subjectGroupSubjects.length; i++) {
            var tempIds = new Array();
            for (var j = 0; j < this.ssList.length; j++) {
                if (this.subjectGroupSubjects[i].subjectId == this.ssList[j].subjectId) {
                    tempIds.push(this.ssList[j].studentId);
                }
            }
            var ids = tempIds.map(function (o) { return o; }).join(',');
            var ss = new subject_students_1.SubjectStudents();
            ss.sectionId = this.selectedSection.id;
            ss.subjectId = this.subjectGroupSubjects[i].subjectId;
            ss.studentIds = ids;
            this.subjectStudentsEdit.push(ss);
        }
        this.save();
    };
    SubjectStudentComponent.prototype.save = function () {
        var _this = this;
        this.ssService
            .post(this.subjectStudentsEdit)
            .then(function () { return _this.subjectStudentsEdit = []; })
            .catch(function (error) { return _this.error = error; });
    };
    SubjectStudentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-subject-student',
            templateUrl: 'subject-student.component.html',
            styleUrls: ['subject-student.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_2.CookieService, class_service_1.ClassService, section_service_1.SectionService, student_service_1.StudentService, class_subject_group_service_1.ClassSubjectGroupService, subject_group_subject_service_1.SubjectGroupSubjectService, subject_student_service_1.SubjectStudentService])
    ], SubjectStudentComponent);
    return SubjectStudentComponent;
}());
exports.SubjectStudentComponent = SubjectStudentComponent;
//# sourceMappingURL=subject-student.component.js.map