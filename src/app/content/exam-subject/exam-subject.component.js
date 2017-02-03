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
var exam_subject_group_1 = require('../exam-subject-group/exam-subject-group');
var exam_subject_group_service_1 = require('../exam-subject-group/exam-subject-group.service');
var subject_group_subject_service_1 = require('../subject-group-subject/subject-group-subject.service');
var subjects_service_1 = require('../subjects/subjects.service');
var exam_subject_1 = require('./exam-subject');
var exam_subject_service_1 = require('./exam-subject.service');
var ExamSubjectComponent = (function () {
    function ExamSubjectComponent(router, classService, examService, esgService, sgsService, subjectsService, examSubjectService) {
        this.router = router;
        this.classService = classService;
        this.examService = examService;
        this.esgService = esgService;
        this.sgsService = sgsService;
        this.subjectsService = subjectsService;
        this.examSubjectService = examSubjectService;
        this.addingExamSubject = false;
        this.isPartitionSubject = false;
        this.addingPartitionSubject = false;
    }
    ExamSubjectComponent.prototype.ngOnInit = function () {
        this.getClasses();
        this.selectedClass = new clas_1.Clas();
        this.selectedExam = new exam_1.Exam();
        this.selectedEsg = new exam_subject_group_1.ExamSubjectGroup();
        this.partitionSubjects = [];
    };
    ExamSubjectComponent.prototype.getClasses = function () {
        var _this = this;
        this.classService
            .getClasses()
            .then(function (classes) { return _this.classes = classes; })
            .catch(function (error) { return _this.error = error; });
    };
    ExamSubjectComponent.prototype.classSelected = function (classId) {
        this.examSubjects = null;
        for (var i = 0; i < this.classes.length; i++) {
            if (this.classes[i].id == classId) {
                this.selectedClass = this.classes[i];
            }
        }
        this.selectedExam = new exam_1.Exam();
        this.selectedEsg = new exam_subject_group_1.ExamSubjectGroup();
        this.examSubjectGroups = null;
        this.getExams(this.selectedClass.id);
        this.addingExamSubject = false;
    };
    ExamSubjectComponent.prototype.getExams = function (id) {
        var _this = this;
        this.examService
            .getExams(id)
            .then(function (exams) { return _this.exams = exams; })
            .catch(function (error) { return _this.error = error; });
    };
    ExamSubjectComponent.prototype.examSelected = function (examId) {
        this.examSubjects = null;
        for (var i = 0; i < this.exams.length; i++) {
            if (this.exams[i].id == examId) {
                this.selectedExam = this.exams[i];
            }
        }
        this.selectedEsg = new exam_subject_group_1.ExamSubjectGroup();
        this.examSubjectGroups = null;
        this.getExamSubjectGroup(this.selectedExam.id);
        this.getExamSubjects(this.selectedExam.id);
        this.addingExamSubject = false;
    };
    ExamSubjectComponent.prototype.getExamSubjectGroup = function (id) {
        var _this = this;
        this.esgService
            .getExamSubjectGroups(id)
            .then(function (esgs) { return _this.examSubjectGroups = esgs; })
            .catch(function (error) { return _this.error = error; });
    };
    ExamSubjectComponent.prototype.esgSelected = function (esgId) {
        for (var i = 0; i < this.examSubjectGroups.length; i++) {
            if (this.examSubjectGroups[i].subjectGroupId == esgId) {
                this.selectedEsg = this.examSubjectGroups[i];
            }
        }
        this.getSubjectGroupSubjects(this.selectedEsg.subjectGroupId);
        this.addingExamSubject = false;
    };
    ExamSubjectComponent.prototype.getSubjectGroupSubjects = function (id) {
        var _this = this;
        this.sgsService
            .getSubjectGroupSubjects(id)
            .then(function (subjectGroupSubjects) { return _this.subjectGroupSubjects = subjectGroupSubjects; })
            .catch(function (error) { return _this.error = error; });
    };
    ExamSubjectComponent.prototype.getExamSubjects = function (id) {
        var _this = this;
        this.examSubjectService
            .getExamSubjects(id)
            .then(function (examSubjects) { return _this.examSubjects = examSubjects; })
            .catch(function (error) { return _this.error = error; });
    };
    ExamSubjectComponent.prototype.getPartitionSubjects = function () {
        var _this = this;
        this.subjectsService
            .getPartitionSubjects(this.selectedExamSubject.subjectId)
            .then(function (partitionSubjects) {
            _this.partitionSubjects = partitionSubjects;
            if (_this.partitionSubjects.length != 0) {
                _this.isPartitionSubject = true;
            }
            else {
                _this.isPartitionSubject = false;
                _this.addingPartitionSubject = false;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    ExamSubjectComponent.prototype.onSelect = function (examSubject) {
        this.selectedExamSubject = examSubject;
        this.addingExamSubject = false;
        this.partitionSubjects = [];
        this.getPartitionSubjects();
    };
    ExamSubjectComponent.prototype.close = function () {
        this.addingExamSubject = false;
    };
    ExamSubjectComponent.prototype.add = function () {
        this.addingPartitionSubject = false;
        if (this.selectedClass.id !== undefined && this.selectedExam.id !== undefined && this.selectedEsg.id !== undefined) {
            this.examSubject = new exam_subject_1.ExamSubject();
            this.examSubject.examId = this.selectedExam.id;
            this.addingExamSubject = true;
        }
        this.selectedExamSubject = null;
    };
    ExamSubjectComponent.prototype.enablePartition = function () {
        this.addingExamSubject = false;
        if (this.addingPartitionSubject) {
            this.addingPartitionSubject = false;
        }
        else {
            this.examSubject = new exam_subject_1.ExamSubject();
            this.examSubject.examId = this.selectedExam.id;
            this.addingPartitionSubject = true;
        }
    };
    ExamSubjectComponent.prototype.delete = function (examSubject, event) {
        var _this = this;
        event.stopPropagation();
        this.examSubjectService
            .delete(examSubject)
            .then(function (res) {
            _this.examSubjects = _this.examSubjects.filter(function (h) { return h !== examSubject; });
            if (_this.selectedExamSubject === examSubject) {
                _this.selectedEsg = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    ExamSubjectComponent.prototype.subjectSelected = function (subjectId) {
        for (var i = 0; i < this.subjectGroupSubjects.length; i++) {
            if (this.subjectGroupSubjects[i].subjectId == subjectId) {
                this.examSubject.subjectName = this.subjectGroupSubjects[i].subjectName;
            }
        }
    };
    ExamSubjectComponent.prototype.partitionSubjectSelected = function (subjectId) {
        for (var i = 0; i < this.partitionSubjects.length; i++) {
            if (this.partitionSubjects[i].id == subjectId) {
                this.examSubject.subjectName = this.partitionSubjects[i].subjectName;
            }
        }
    };
    ExamSubjectComponent.prototype.save = function () {
        var _this = this;
        this.examSubjectService
            .post(this.examSubject)
            .then(function (examSubject) {
            _this.addingExamSubject = false;
            _this.addingPartitionSubject = false;
            _this.examSubjectGroup = null;
            _this.examSubjectGroups = null;
            _this.selectedExam = new exam_1.Exam();
            _this.selectedEsg = new exam_subject_group_1.ExamSubjectGroup();
            _this.examSubjects = null;
            //this.selectedExamSubject = new ExamSubject();
            //this.getExamSubjects(this.selectedExam.id);
        })
            .catch(function (error) { return _this.error = error; });
    };
    ExamSubjectComponent.prototype.update = function (examSubject, event) {
        var _this = this;
        event.stopPropagation();
        this.examSubjectService
            .save(examSubject)
            .then(function () { return _this.getExamSubjects(_this.selectedExam.id); })
            .catch(function (error) { return _this.error = error; });
    };
    ExamSubjectComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-exam-subject',
            templateUrl: 'exam-subject.component.html',
            styleUrls: ['exam-subject.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, class_service_1.ClassService, exam_service_1.ExamService, exam_subject_group_service_1.ExamSubjectGroupService, subject_group_subject_service_1.SubjectGroupSubjectService, subjects_service_1.SubjectsService, exam_subject_service_1.ExamSubjectService])
    ], ExamSubjectComponent);
    return ExamSubjectComponent;
}());
exports.ExamSubjectComponent = ExamSubjectComponent;
//# sourceMappingURL=exam-subject.component.js.map