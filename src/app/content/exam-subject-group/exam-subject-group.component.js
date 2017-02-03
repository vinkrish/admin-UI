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
var class_service_1 = require('../class/class.service');
var exam_1 = require('../exam/exam');
var exam_service_1 = require('../exam/exam.service');
var class_subject_group_service_1 = require('../class-subject-group/class-subject-group.service');
var exam_subject_group_1 = require('./exam-subject-group');
var exam_subject_group_service_1 = require('./exam-subject-group.service');
var ExamSubjectGroupComponent = (function () {
    function ExamSubjectGroupComponent(router, classService, examService, csgService, esgService) {
        this.router = router;
        this.classService = classService;
        this.examService = examService;
        this.csgService = csgService;
        this.esgService = esgService;
        this.addingEsg = false;
    }
    ExamSubjectGroupComponent.prototype.ngOnInit = function () {
        this.getClasses();
        this.selectedClass = new clas_1.Clas();
        this.selectedExam = new exam_1.Exam();
    };
    ExamSubjectGroupComponent.prototype.getClasses = function () {
        var _this = this;
        this.classService
            .getClasses()
            .then(function (classes) { return _this.classes = classes; })
            .catch(function (error) { return _this.error = error; });
    };
    ExamSubjectGroupComponent.prototype.classSelected = function (classId) {
        for (var i = 0; i < this.classes.length; i++) {
            if (this.classes[i].id == classId) {
                this.selectedClass = this.classes[i];
            }
        }
        this.selectedExam = new exam_1.Exam();
        this.classSubjectGroups = null;
        this.getClassSubjectGroups(this.selectedClass.id);
        this.examSubjectGroups = null;
        this.getExams(this.selectedClass.id);
        this.addingEsg = false;
    };
    ExamSubjectGroupComponent.prototype.getExams = function (id) {
        var _this = this;
        this.examService
            .getExams(id)
            .then(function (exams) { return _this.exams = exams; })
            .catch(function (error) { return _this.error = error; });
    };
    ExamSubjectGroupComponent.prototype.examSelected = function (examId) {
        for (var i = 0; i < this.exams.length; i++) {
            if (this.exams[i].id == examId) {
                this.selectedExam = this.exams[i];
            }
        }
        this.examSubjectGroups = null;
        this.getExamSubjectGroup(this.selectedExam.id);
        this.addingEsg = false;
    };
    ExamSubjectGroupComponent.prototype.getExamSubjectGroup = function (id) {
        var _this = this;
        this.esgService
            .getExamSubjectGroups(id)
            .then(function (esgs) { return _this.examSubjectGroups = esgs; })
            .catch(function (error) { return _this.error = error; });
    };
    ExamSubjectGroupComponent.prototype.onSelect = function (esg) {
        this.selectedEsg = esg;
        this.addingEsg = false;
    };
    ExamSubjectGroupComponent.prototype.close = function () {
        this.addingEsg = false;
    };
    ExamSubjectGroupComponent.prototype.add = function () {
        if (this.selectedClass.id !== undefined && this.selectedExam.id !== undefined) {
            this.examSubjectGroup = new exam_subject_group_1.ExamSubjectGroup();
            this.examSubjectGroup.examId = this.selectedExam.id;
            this.addingEsg = true;
        }
        this.selectedEsg = null;
    };
    ExamSubjectGroupComponent.prototype.delete = function (esg, event) {
        var _this = this;
        event.stopPropagation();
        this.esgService
            .delete(esg)
            .then(function (res) {
            _this.examSubjectGroups = _this.examSubjectGroups.filter(function (h) { return h !== esg; });
            if (_this.selectedEsg === esg) {
                _this.selectedEsg = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    ExamSubjectGroupComponent.prototype.getClassSubjectGroups = function (id) {
        var _this = this;
        this.csgService
            .getClassSubjectGroups(id)
            .then(function (classSubjectGroups) { return _this.classSubjectGroups = classSubjectGroups; })
            .catch(function (error) { return _this.error = error; });
    };
    ExamSubjectGroupComponent.prototype.csgSelected = function (csgId) {
        for (var i = 0; i < this.classSubjectGroups.length; i++) {
            if (this.classSubjectGroups[i].subjectGroupId == csgId) {
                this.examSubjectGroup.subjectGroupName = this.classSubjectGroups[i].subjectGroupName;
            }
        }
    };
    ExamSubjectGroupComponent.prototype.save = function () {
        var _this = this;
        this.esgService
            .post(this.examSubjectGroup)
            .then(function (examSubjectGroup) {
            _this.addingEsg = false;
            _this.examSubjectGroup = null;
            _this.examSubjectGroups = null;
            _this.selectedExam = new exam_1.Exam();
        })
            .catch(function (error) { return _this.error = error; });
    };
    ExamSubjectGroupComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-esg',
            templateUrl: 'exam-subject-group.component.html',
            styleUrls: ['exam-subject-group.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, class_service_1.ClassService, exam_service_1.ExamService, class_subject_group_service_1.ClassSubjectGroupService, exam_subject_group_service_1.ExamSubjectGroupService])
    ], ExamSubjectGroupComponent);
    return ExamSubjectGroupComponent;
}());
exports.ExamSubjectGroupComponent = ExamSubjectGroupComponent;
//# sourceMappingURL=exam-subject-group.component.js.map