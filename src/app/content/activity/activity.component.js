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
var exam_1 = require('../exam/exam');
var exam_service_1 = require('../exam/exam.service');
var exam_subject_1 = require('../exam-subject/exam-subject');
var exam_subject_service_1 = require('../exam-subject/exam-subject.service');
var activity_1 = require('./activity');
var activity_service_1 = require('./activity.service');
var ActivityComponent = (function () {
    function ActivityComponent(router, classService, sectionService, examService, examSubjectService, activityService) {
        this.router = router;
        this.classService = classService;
        this.sectionService = sectionService;
        this.examService = examService;
        this.examSubjectService = examSubjectService;
        this.activityService = activityService;
        this.addingActivity = false;
    }
    ActivityComponent.prototype.ngOnInit = function () {
        this.getClasses();
        this.selectedClass = new clas_1.Clas();
        this.selectedSection = new section_1.Section();
        this.selectedExam = new exam_1.Exam();
        this.selectedExamSubject = new exam_subject_1.ExamSubject();
    };
    ActivityComponent.prototype.getClasses = function () {
        var _this = this;
        this.classService
            .getClasses()
            .then(function (classes) { return _this.classes = classes; })
            .catch(function (error) { return _this.error = error; });
    };
    ActivityComponent.prototype.classSelected = function (classId) {
        this.examSubjects = null;
        for (var i = 0; i < this.classes.length; i++) {
            if (this.classes[i].id == classId) {
                this.selectedClass = this.classes[i];
            }
        }
        this.activities = null;
        this.selectedSection = new section_1.Section();
        this.selectedExam = new exam_1.Exam();
        this.selectedExamSubject = new exam_subject_1.ExamSubject();
        this.getSections(this.selectedClass.id);
        this.getExams(this.selectedClass.id);
        this.addingActivity = false;
    };
    ActivityComponent.prototype.getSections = function (id) {
        var _this = this;
        this.sectionService
            .getSections(id)
            .then(function (sections) { return _this.sections = sections; })
            .catch(function (error) { return _this.error = error; });
    };
    ActivityComponent.prototype.sectionSelected = function (sectionId) {
        for (var i = 0; i < this.sections.length; i++) {
            if (this.sections[i].id == sectionId) {
                this.selectedSection = this.sections[i];
            }
        }
        this.selectedExamSubject = new exam_subject_1.ExamSubject();
        this.activities = null;
        this.addingActivity = false;
    };
    ActivityComponent.prototype.getExams = function (id) {
        var _this = this;
        this.examService
            .getExams(id)
            .then(function (exams) { return _this.exams = exams; })
            .catch(function (error) { return _this.error = error; });
    };
    ActivityComponent.prototype.examSelected = function (examId) {
        this.examSubjects = null;
        for (var i = 0; i < this.exams.length; i++) {
            if (this.exams[i].id == examId) {
                this.selectedExam = this.exams[i];
            }
        }
        this.selectedExamSubject = new exam_subject_1.ExamSubject();
        this.activities = null;
        this.getExamSubjects(this.selectedExam.id);
        this.addingActivity = false;
    };
    ActivityComponent.prototype.getExamSubjects = function (id) {
        var _this = this;
        this.examSubjectService
            .getExamSubjects(id)
            .then(function (examSubjects) { return _this.examSubjects = examSubjects; })
            .catch(function (error) { return _this.error = error; });
    };
    ActivityComponent.prototype.examSubjectSelected = function (subjectId) {
        for (var i = 0; i < this.examSubjects.length; i++) {
            if (this.examSubjects[i].subjectId == subjectId) {
                this.selectedExamSubject = this.examSubjects[i];
            }
        }
        this.activities = null;
        this.getActivities();
        this.addingActivity = false;
    };
    ActivityComponent.prototype.getActivities = function () {
        var _this = this;
        this.activityService
            .getActivities(this.selectedSection.id, this.selectedExam.id, this.selectedExamSubject.subjectId)
            .then(function (activities) { return _this.activities = activities; })
            .catch(function (error) { return _this.error = error; });
    };
    ActivityComponent.prototype.onSelect = function (activity) {
        this.selectedActivity = activity;
        this.addingActivity = false;
    };
    ActivityComponent.prototype.close = function () {
        this.addingActivity = false;
    };
    ActivityComponent.prototype.add = function () {
        if (this.selectedClass.id !== undefined &&
            this.selectedSection.id !== undefined &&
            this.selectedExam.id !== undefined &&
            this.selectedExamSubject.id !== undefined) {
            this.activity = new activity_1.Activity();
            this.activity.sectionId = this.selectedSection.id;
            this.activity.examId = this.selectedExam.id;
            this.activity.subjectId = this.selectedExamSubject.subjectId;
            this.addingActivity = true;
        }
        this.selectedActivity = null;
    };
    ActivityComponent.prototype.delete = function (activity, event) {
        var _this = this;
        event.stopPropagation();
        this.activityService
            .delete(activity)
            .then(function (res) {
            _this.activities = _this.activities.filter(function (h) { return h !== activity; });
            if (_this.selectedActivity === activity) {
                _this.selectedActivity = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    ActivityComponent.prototype.save = function () {
        var _this = this;
        this.activityService
            .post(this.activity)
            .then(function (activity) {
            _this.addingActivity = false;
            _this.selectedExamSubject = new exam_subject_1.ExamSubject();
            _this.activities = null;
        })
            .catch(function (error) { return _this.error = error; });
    };
    ActivityComponent.prototype.update = function (activity, event) {
        var _this = this;
        event.stopPropagation();
        this.activityService
            .save(activity)
            .then(function () { return _this.getExamSubjects(_this.selectedExam.id); })
            .catch(function (error) { return _this.error = error; });
    };
    ActivityComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-activity',
            templateUrl: 'activity.component.html',
            styleUrls: ['activity.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, class_service_1.ClassService, section_service_1.SectionService, exam_service_1.ExamService, exam_subject_service_1.ExamSubjectService, activity_service_1.ActivityService])
    ], ActivityComponent);
    return ActivityComponent;
}());
exports.ActivityComponent = ActivityComponent;
//# sourceMappingURL=activity.component.js.map