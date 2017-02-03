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
var subject_student_service_1 = require('../subject-student/subject-student.service');
var exam_1 = require('../exam/exam');
var exam_service_1 = require('../exam/exam.service');
var exam_subject_1 = require('../exam-subject/exam-subject');
var exam_subject_service_1 = require('../exam-subject/exam-subject.service');
var activity_1 = require('../activity/activity');
var activity_service_1 = require('../activity/activity.service');
var activity_score_1 = require('./activity-score');
var activity_score_service_1 = require('./activity-score.service');
var core_2 = require('angular2-cookie/core');
var ActivityScoreComponent = (function () {
    function ActivityScoreComponent(router, cookieService, classService, sectionService, studentService, examService, examSubjectService, ssService, activityService, actScoreService) {
        this.router = router;
        this.cookieService = cookieService;
        this.classService = classService;
        this.sectionService = sectionService;
        this.studentService = studentService;
        this.examService = examService;
        this.examSubjectService = examSubjectService;
        this.ssService = ssService;
        this.activityService = activityService;
        this.actScoreService = actScoreService;
    }
    ActivityScoreComponent.prototype.ngOnInit = function () {
        this.getClasses();
        this.selectedClass = new clas_1.Clas(0, "");
        this.clearValues();
    };
    ActivityScoreComponent.prototype.getClasses = function () {
        var _this = this;
        this.classService
            .getClasses()
            .then(function (classes) { return _this.classes = classes; })
            .catch(function (error) { return _this.error = error; });
    };
    ActivityScoreComponent.prototype.classSelected = function (classId) {
        for (var i = 0; i < this.classes.length; i++) {
            if (this.classes[i].id == classId) {
                this.selectedClass = this.classes[i];
            }
        }
        this.clearValues();
        this.getSections(this.selectedClass.id);
        this.getExams(this.selectedClass.id);
    };
    ActivityScoreComponent.prototype.getSections = function (id) {
        var _this = this;
        this.sectionService
            .getSections(id)
            .then(function (sections) { return _this.sections = sections; })
            .catch(function (error) { return _this.error = error; });
    };
    ActivityScoreComponent.prototype.sectionSelected = function (sectionId) {
        for (var i = 0; i < this.sections.length; i++) {
            if (this.sections[i].id == sectionId) {
                this.selectedSection = this.sections[i];
            }
        }
        this.selectedExam = new exam_1.Exam();
        this.selectedExamSubject = new exam_subject_1.ExamSubject();
        this.selectedActivity = new activity_1.Activity();
        this.activities = [];
        this.examStudents = [];
        this.score = [];
        this.students = [];
        this.existingScore = [];
        this.getStudents(this.selectedSection.id);
    };
    ActivityScoreComponent.prototype.getStudents = function (id) {
        var _this = this;
        this.studentService
            .getStudents(id)
            .then(function (students) {
            _this.students = students;
        })
            .catch(function (error) { return _this.error = error; });
    };
    ActivityScoreComponent.prototype.getExams = function (id) {
        var _this = this;
        this.examService
            .getExams(id)
            .then(function (exams) { return _this.exams = exams; })
            .catch(function (error) { return _this.error = error; });
    };
    ActivityScoreComponent.prototype.examSelected = function (examId) {
        this.examSubjects = null;
        for (var i = 0; i < this.exams.length; i++) {
            if (this.exams[i].id == examId) {
                this.selectedExam = this.exams[i];
            }
        }
        this.selectedExamSubject = new exam_subject_1.ExamSubject();
        this.selectedActivity = new activity_1.Activity();
        this.activities = [];
        this.examStudents = [];
        this.score = [];
        this.existingScore = [];
        this.getExamSubjects(this.selectedExam.id);
    };
    ActivityScoreComponent.prototype.getExamSubjects = function (id) {
        var _this = this;
        this.examSubjectService
            .getExamSubjects(id)
            .then(function (examSubjects) { return _this.examSubjects = examSubjects; })
            .catch(function (error) { return _this.error = error; });
    };
    ActivityScoreComponent.prototype.examSubjectSelected = function (subjectId) {
        for (var i = 0; i < this.examSubjects.length; i++) {
            if (this.examSubjects[i].subjectId == subjectId) {
                this.selectedExamSubject = this.examSubjects[i];
            }
        }
        this.selectedActivity = new activity_1.Activity();
        this.activities = [];
        this.examStudents = [];
        this.score = [];
        this.existingScore = [];
        this.getSubjectStudents();
    };
    ActivityScoreComponent.prototype.getSubjectStudents = function () {
        var _this = this;
        this.ssService
            .getSubjectStudent(this.selectedSection.id, this.selectedExamSubject.subjectId)
            .then(function (subjectStudent) {
            _this.subjectStudent = subjectStudent;
            _this.getActivites();
        })
            .catch(function (error) { return _this.error = error; });
    };
    ActivityScoreComponent.prototype.initExamStudents = function () {
        if (typeof this.subjectStudent.studentIds != 'undefined') {
            var intIds = this.subjectStudent.studentIds.split(",").map(Number).filter(Boolean);
            for (var _i = 0, intIds_1 = intIds; _i < intIds_1.length; _i++) {
                var ids = intIds_1[_i];
                for (var i = 0; i < this.students.length; i++) {
                    if (this.students[i].id == ids) {
                        this.examStudents.push(this.students[i]);
                        this.initScore(i);
                    }
                }
            }
        }
    };
    ActivityScoreComponent.prototype.initScore = function (index) {
        var actscore = new activity_score_1.ActivityScore();
        actscore.activityId = this.selectedActivity.id;
        actscore.studentId = this.students[index].id;
        actscore.grade = '';
        this.score.push(actscore);
    };
    ActivityScoreComponent.prototype.getActivites = function () {
        var _this = this;
        this.activityService
            .getActivities(this.selectedSection.id, this.selectedExam.id, this.selectedExamSubject.subjectId)
            .then(function (activities) { return _this.activities = activities; })
            .catch(function (error) { return _this.error = error; });
    };
    ActivityScoreComponent.prototype.activitySelected = function (activityId) {
        for (var i = 0; i < this.activities.length; i++) {
            if (this.activities[i].id == activityId) {
                this.selectedActivity = this.activities[i];
            }
        }
        this.examStudents = [];
        this.score = [];
        this.existingScore = [];
        this.initExamStudents();
        this.getActivityScore();
    };
    ActivityScoreComponent.prototype.getActivityScore = function () {
        var _this = this;
        this.actScoreService
            .getScore(this.selectedActivity.id)
            .then(function (existingScore) {
            _this.existingScore = existingScore;
            if (_this.existingScore.length == 0) {
                _this.isScorePresent = false;
            }
            else {
                _this.isScorePresent = true;
                _this.exportScore();
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    ActivityScoreComponent.prototype.exportScore = function () {
        for (var i = 0; i < this.score.length; i++) {
            for (var j = 0; j < this.existingScore.length; j++) {
                if (this.existingScore[j].studentId == this.score[i].studentId) {
                    this.score[i].id = this.existingScore[j].id;
                    this.score[i].mark = this.existingScore[j].mark;
                    this.score[i].grade = this.existingScore[j].grade;
                }
            }
        }
    };
    ActivityScoreComponent.prototype.defaultScore = function () {
        for (var i = 0; i < this.score.length; i++) {
            if (typeof this.score[i].mark == 'undefined') {
                this.score[i].mark = 0;
            }
        }
    };
    ActivityScoreComponent.prototype.clearValues = function () {
        this.selectedSection = new section_1.Section(0, "");
        this.selectedExam = new exam_1.Exam();
        this.selectedExamSubject = new exam_subject_1.ExamSubject();
        this.selectedActivity = new activity_1.Activity();
        this.exams = [];
        this.examStudents = [];
        this.examSubjects = [];
        this.activities = [];
        this.score = [];
        this.students = [];
        this.existingScore = [];
    };
    ActivityScoreComponent.prototype.save = function () {
        var _this = this;
        this.defaultScore();
        if (this.isScorePresent) {
            this.actScoreService
                .put(this.score)
                .then()
                .catch(function (error) { return _this.error = error; });
        }
        else {
            this.actScoreService
                .post(this.score)
                .then()
                .catch(function (error) { return _this.error = error; });
        }
    };
    ActivityScoreComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-activity-score',
            templateUrl: 'activity-score.component.html',
            styleUrls: ['activity-score.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_2.CookieService, class_service_1.ClassService, section_service_1.SectionService, student_service_1.StudentService, exam_service_1.ExamService, exam_subject_service_1.ExamSubjectService, subject_student_service_1.SubjectStudentService, activity_service_1.ActivityService, activity_score_service_1.ActivityScoreService])
    ], ActivityScoreComponent);
    return ActivityScoreComponent;
}());
exports.ActivityScoreComponent = ActivityScoreComponent;
//# sourceMappingURL=activity-score.component.js.map