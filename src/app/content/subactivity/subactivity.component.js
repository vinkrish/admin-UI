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
var activity_1 = require('../activity/activity');
var activity_service_1 = require('../activity/activity.service');
var subactivity_1 = require('./subactivity');
var subactivity_service_1 = require('./subactivity.service');
var SubActivityComponent = (function () {
    function SubActivityComponent(router, classService, sectionService, examService, examSubjectService, activityService, subActivityService) {
        this.router = router;
        this.classService = classService;
        this.sectionService = sectionService;
        this.examService = examService;
        this.examSubjectService = examSubjectService;
        this.activityService = activityService;
        this.subActivityService = subActivityService;
        this.addingSubActivity = false;
    }
    SubActivityComponent.prototype.ngOnInit = function () {
        this.getClasses();
        this.selectedClass = new clas_1.Clas();
        this.selectedSection = new section_1.Section();
        this.selectedExam = new exam_1.Exam();
        this.selectedExamSubject = new exam_subject_1.ExamSubject();
        this.selectedActivity = new activity_1.Activity();
    };
    SubActivityComponent.prototype.getClasses = function () {
        var _this = this;
        this.classService
            .getClasses()
            .then(function (classes) { return _this.classes = classes; })
            .catch(function (error) { return _this.error = error; });
    };
    SubActivityComponent.prototype.classSelected = function (classId) {
        this.examSubjects = null;
        for (var i = 0; i < this.classes.length; i++) {
            if (this.classes[i].id == classId) {
                this.selectedClass = this.classes[i];
            }
        }
        this.subActivities = null;
        this.selectedSection = new section_1.Section();
        this.selectedExam = new exam_1.Exam();
        this.selectedExamSubject = new exam_subject_1.ExamSubject();
        this.selectedActivity = new activity_1.Activity();
        this.getSections(this.selectedClass.id);
        this.getExams(this.selectedClass.id);
        this.addingSubActivity = false;
    };
    SubActivityComponent.prototype.getSections = function (id) {
        var _this = this;
        this.sectionService
            .getSections(id)
            .then(function (sections) { return _this.sections = sections; })
            .catch(function (error) { return _this.error = error; });
    };
    SubActivityComponent.prototype.sectionSelected = function (sectionId) {
        for (var i = 0; i < this.sections.length; i++) {
            if (this.sections[i].id == sectionId) {
                this.selectedSection = this.sections[i];
            }
        }
        this.selectedExamSubject = new exam_subject_1.ExamSubject();
        this.selectedActivity = new activity_1.Activity();
        this.activities = null;
        this.subActivities = null;
        this.addingSubActivity = false;
    };
    SubActivityComponent.prototype.getExams = function (id) {
        var _this = this;
        this.examService
            .getExams(id)
            .then(function (exams) { return _this.exams = exams; })
            .catch(function (error) { return _this.error = error; });
    };
    SubActivityComponent.prototype.examSelected = function (examId) {
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
    };
    SubActivityComponent.prototype.getExamSubjects = function (id) {
        var _this = this;
        this.examSubjectService
            .getExamSubjects(id)
            .then(function (examSubjects) { return _this.examSubjects = examSubjects; })
            .catch(function (error) { return _this.error = error; });
    };
    SubActivityComponent.prototype.examSubjectSelected = function (subjectId) {
        for (var i = 0; i < this.examSubjects.length; i++) {
            if (this.examSubjects[i].subjectId == subjectId) {
                this.selectedExamSubject = this.examSubjects[i];
            }
        }
        this.activities = null;
        this.subActivities = null;
        this.getActivities();
        this.addingSubActivity = false;
    };
    SubActivityComponent.prototype.getActivities = function () {
        var _this = this;
        this.activityService
            .getActivities(this.selectedSection.id, this.selectedExam.id, this.selectedExamSubject.subjectId)
            .then(function (activities) { return _this.activities = activities; })
            .catch(function (error) { return _this.error = error; });
    };
    SubActivityComponent.prototype.activitySelected = function (activityId) {
        for (var i = 0; i < this.activities.length; i++) {
            if (this.activities[i].id == activityId) {
                this.selectedActivity = this.activities[i];
            }
        }
        this.subActivities = null;
        this.getSubActivities();
        this.addingSubActivity = false;
    };
    SubActivityComponent.prototype.getSubActivities = function () {
        var _this = this;
        this.subActivityService
            .getSubActivities(this.selectedActivity.id)
            .then(function (subActivities) { return _this.subActivities = subActivities; })
            .catch(function (error) { return _this.error = error; });
    };
    SubActivityComponent.prototype.onSelect = function (subactivity) {
        this.selectedSubActivity = subactivity;
        this.addingSubActivity = false;
    };
    SubActivityComponent.prototype.close = function () {
        this.addingSubActivity = false;
    };
    SubActivityComponent.prototype.add = function () {
        if (this.selectedClass.id !== undefined &&
            this.selectedSection.id !== undefined &&
            this.selectedExam.id !== undefined &&
            this.selectedExamSubject.id !== undefined &&
            this.selectedActivity.id != undefined) {
            this.subActivity = new subactivity_1.SubActivity();
            this.subActivity.activityId = this.selectedActivity.id;
            this.addingSubActivity = true;
        }
        this.selectedSubActivity = null;
    };
    SubActivityComponent.prototype.delete = function (subactivity, event) {
        var _this = this;
        event.stopPropagation();
        this.subActivityService
            .delete(subactivity)
            .then(function (res) {
            _this.subActivities = _this.subActivities.filter(function (h) { return h !== subactivity; });
            if (_this.selectedSubActivity === subactivity) {
                _this.selectedSubActivity = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    SubActivityComponent.prototype.save = function () {
        var _this = this;
        this.subActivityService
            .post(this.subActivity)
            .then(function (subactivity) {
            _this.addingSubActivity = false;
            _this.selectedActivity = new activity_1.Activity();
            _this.subActivities = null;
        })
            .catch(function (error) { return _this.error = error; });
    };
    SubActivityComponent.prototype.update = function (subactivity, event) {
        var _this = this;
        event.stopPropagation();
        this.subActivityService
            .save(subactivity)
            .then(function () { return _this.getExamSubjects(_this.selectedExam.id); })
            .catch(function (error) { return _this.error = error; });
    };
    SubActivityComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-subactivity',
            templateUrl: 'subactivity.component.html',
            styleUrls: ['subactivity.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, class_service_1.ClassService, section_service_1.SectionService, exam_service_1.ExamService, exam_subject_service_1.ExamSubjectService, activity_service_1.ActivityService, subactivity_service_1.SubActivityService])
    ], SubActivityComponent);
    return SubActivityComponent;
}());
exports.SubActivityComponent = SubActivityComponent;
//# sourceMappingURL=subactivity.component.js.map