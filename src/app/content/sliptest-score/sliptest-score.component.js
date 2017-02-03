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
var class_subject_group_1 = require('../class-subject-group/class-subject-group');
var subject_group_subject_1 = require('../subject-group-subject/subject-group-subject');
var sliptest_1 = require('../sliptest/sliptest');
var sliptest_score_1 = require('./sliptest-score');
var class_service_1 = require('../class/class.service');
var section_service_1 = require('../section/section.service');
var student_service_1 = require('../student/student.service');
var class_subject_group_service_1 = require('../class-subject-group/class-subject-group.service');
var subject_group_subject_service_1 = require('../subject-group-subject/subject-group-subject.service');
var sliptest_service_1 = require('../sliptest/sliptest.service');
var subject_student_service_1 = require('../subject-student/subject-student.service');
var sliptest_score_service_1 = require('./sliptest-score.service');
var core_2 = require('angular2-cookie/core');
var SliptestScoreComponent = (function () {
    function SliptestScoreComponent(router, cookieService, classService, sectionService, studentService, csgService, sgsService, ssService, sliptestService, stsService) {
        this.router = router;
        this.cookieService = cookieService;
        this.classService = classService;
        this.sectionService = sectionService;
        this.studentService = studentService;
        this.csgService = csgService;
        this.sgsService = sgsService;
        this.ssService = ssService;
        this.sliptestService = sliptestService;
        this.stsService = stsService;
    }
    SliptestScoreComponent.prototype.ngOnInit = function () {
        this.getClasses();
        this.selectedClass = new clas_1.Clas(0, "");
        this.clearValues();
    };
    SliptestScoreComponent.prototype.getClasses = function () {
        var _this = this;
        this.classService
            .getClasses()
            .then(function (classes) { return _this.classes = classes; })
            .catch(function (error) { return _this.error = error; });
    };
    SliptestScoreComponent.prototype.classSelected = function (classId) {
        for (var i = 0; i < this.classes.length; i++) {
            if (this.classes[i].id == classId) {
                this.selectedClass = this.classes[i];
            }
        }
        this.clearValues();
        this.getSections(this.selectedClass.id);
        this.getClassSubjectGroups(this.selectedClass.id);
    };
    SliptestScoreComponent.prototype.getSections = function (id) {
        var _this = this;
        this.sectionService
            .getSections(id)
            .then(function (sections) { return _this.sections = sections; })
            .catch(function (error) { return _this.error = error; });
    };
    SliptestScoreComponent.prototype.sectionSelected = function (sectionId) {
        for (var i = 0; i < this.sections.length; i++) {
            if (this.sections[i].id == sectionId) {
                this.selectedSection = this.sections[i];
            }
        }
        this.selectedSliptest = new sliptest_1.Sliptest();
        this.selectedSGS = new subject_group_subject_1.SubjectGroupSubject();
        this.sliptests = [];
        this.marks = [];
        this.existingMarks = [];
        this.students = [];
        this.sliptestStudents = [];
        this.getStudents(this.selectedSection.id);
    };
    SliptestScoreComponent.prototype.getStudents = function (id) {
        var _this = this;
        this.studentService
            .getStudents(id)
            .then(function (students) {
            _this.students = students;
        })
            .catch(function (error) { return _this.error = error; });
    };
    SliptestScoreComponent.prototype.getClassSubjectGroups = function (id) {
        var _this = this;
        this.csgService
            .getClassSubjectGroups(id)
            .then(function (classSubjectGroups) { return _this.classSubjectGroups = classSubjectGroups; })
            .catch(function (error) { return _this.error = error; });
    };
    SliptestScoreComponent.prototype.csgSelected = function (csgId) {
        for (var i = 0; i < this.classSubjectGroups.length; i++) {
            if (this.classSubjectGroups[i].subjectGroupId == csgId) {
                this.selectedCSG = this.classSubjectGroups[i];
            }
        }
        this.selectedSGS = new subject_group_subject_1.SubjectGroupSubject();
        this.selectedSliptest = new sliptest_1.Sliptest();
        this.subjectGroupSubjects = [];
        this.sliptests = [];
        this.marks = [];
        this.existingMarks = [];
        this.sliptestStudents = [];
        this.getSubjectGroupSubjects(this.selectedCSG.subjectGroupId);
    };
    SliptestScoreComponent.prototype.getSubjectGroupSubjects = function (id) {
        var _this = this;
        this.sgsService
            .getSubjectGroupSubjects(id)
            .then(function (subjectGroupSubjects) { return _this.subjectGroupSubjects = subjectGroupSubjects; })
            .catch(function (error) { return _this.error = error; });
    };
    SliptestScoreComponent.prototype.sgsSelected = function (subjectId) {
        for (var i = 0; i < this.subjectGroupSubjects.length; i++) {
            if (this.subjectGroupSubjects[i].subjectId == subjectId) {
                this.selectedSGS = this.subjectGroupSubjects[i];
            }
        }
        this.selectedSliptest = new sliptest_1.Sliptest();
        this.sliptests = [];
        this.marks = [];
        this.sliptestStudents = [];
        this.existingMarks = [];
        this.getSliptests();
        this.getSubjectStudents();
    };
    SliptestScoreComponent.prototype.getSliptests = function () {
        var _this = this;
        this.sliptestService
            .getSliptests(this.selectedSection.id, this.selectedSGS.subjectId)
            .then(function (sliptests) { return _this.sliptests = sliptests; })
            .catch(function (error) { return _this.error = error; });
    };
    SliptestScoreComponent.prototype.sliptestSelected = function (sliptestId) {
        for (var i = 0; i < this.sliptests.length; i++) {
            if (this.sliptests[i].id == sliptestId) {
                this.selectedSliptest = this.sliptests[i];
            }
        }
        this.marks = [];
        this.existingMarks = [];
        this.sliptestStudents = [];
        this.initSliptestStudents();
    };
    SliptestScoreComponent.prototype.getSubjectStudents = function () {
        var _this = this;
        this.ssService
            .getSubjectStudent(this.selectedSection.id, this.selectedSGS.subjectId)
            .then(function (subjectStudent) { return _this.subjectStudent = subjectStudent; })
            .catch(function (error) { return _this.error = error; });
    };
    SliptestScoreComponent.prototype.initSliptestStudents = function () {
        if (typeof this.subjectStudent.studentIds != 'undefined') {
            var intIds = this.subjectStudent.studentIds.split(",").map(Number).filter(Boolean);
            for (var _i = 0, intIds_1 = intIds; _i < intIds_1.length; _i++) {
                var ids = intIds_1[_i];
                for (var i = 0; i < this.students.length; i++) {
                    if (this.students[i].id == ids) {
                        this.sliptestStudents.push(this.students[i]);
                        this.initMarks(i);
                    }
                }
            }
            this.getMarks();
        }
    };
    SliptestScoreComponent.prototype.getMarks = function () {
        var _this = this;
        this.stsService
            .getMarks(this.selectedSliptest.id)
            .then(function (existingMarks) {
            _this.existingMarks = existingMarks;
            if (_this.existingMarks.length == 0) {
                _this.isMarksPresent = false;
            }
            else {
                _this.isMarksPresent = true;
                _this.exportMarks();
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    SliptestScoreComponent.prototype.initMarks = function (index) {
        var marc = new sliptest_score_1.SliptestScore();
        marc.sliptestId = this.selectedSliptest.id;
        marc.studentId = this.students[index].id;
        marc.grade = '';
        this.marks.push(marc);
    };
    SliptestScoreComponent.prototype.exportMarks = function () {
        for (var i = 0; i < this.marks.length; i++) {
            for (var j = 0; j < this.existingMarks.length; j++) {
                if (this.existingMarks[j].studentId == this.marks[i].studentId) {
                    this.marks[i].id = this.existingMarks[j].id;
                    this.marks[i].mark = this.existingMarks[j].mark;
                    this.marks[i].grade = this.existingMarks[j].grade;
                }
            }
        }
    };
    SliptestScoreComponent.prototype.defaultMarks = function () {
        for (var i = 0; i < this.marks.length; i++) {
            if (typeof this.marks[i].mark == 'undefined') {
                this.marks[i].mark = 0;
            }
        }
    };
    SliptestScoreComponent.prototype.clearValues = function () {
        this.selectedSection = new section_1.Section();
        this.selectedCSG = new class_subject_group_1.ClassSubjectGroup();
        this.selectedSGS = new subject_group_subject_1.SubjectGroupSubject();
        this.selectedSliptest = new sliptest_1.Sliptest();
        this.sections = [];
        this.classSubjectGroups = [];
        this.subjectGroupSubjects = [];
        this.sliptests = [];
        this.marks = [];
        this.students = [];
        this.sliptestStudents = [];
        this.existingMarks = [];
    };
    SliptestScoreComponent.prototype.save = function () {
        var _this = this;
        this.defaultMarks();
        if (this.isMarksPresent) {
            this.stsService
                .put(this.marks)
                .then()
                .catch(function (error) { return _this.error = error; });
        }
        else {
            this.stsService
                .post(this.marks)
                .then()
                .catch(function (error) { return _this.error = error; });
        }
    };
    SliptestScoreComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-sliptest-score',
            templateUrl: 'sliptest-score.component.html',
            styleUrls: ['sliptest-score.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_2.CookieService, class_service_1.ClassService, section_service_1.SectionService, student_service_1.StudentService, class_subject_group_service_1.ClassSubjectGroupService, subject_group_subject_service_1.SubjectGroupSubjectService, subject_student_service_1.SubjectStudentService, sliptest_service_1.SliptestService, sliptest_score_service_1.SliptestScoreService])
    ], SliptestScoreComponent);
    return SliptestScoreComponent;
}());
exports.SliptestScoreComponent = SliptestScoreComponent;
//# sourceMappingURL=sliptest-score.component.js.map