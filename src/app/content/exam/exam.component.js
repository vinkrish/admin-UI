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
var exam_service_1 = require('./exam.service');
var core_2 = require('angular2-cookie/core');
var ExamComponent = (function () {
    function ExamComponent(router, cookieService, classService, examService) {
        this.router = router;
        this.cookieService = cookieService;
        this.classService = classService;
        this.examService = examService;
        this.addingExam = false;
    }
    ExamComponent.prototype.ngOnInit = function () {
        this.getClasses();
        this.selectedClass = new clas_1.Clas();
    };
    ExamComponent.prototype.getClasses = function () {
        var _this = this;
        this.classService
            .getClasses()
            .then(function (classes) { return _this.classes = classes; })
            .catch(function (error) { return _this.error = error; });
    };
    ExamComponent.prototype.classSelected = function (classId) {
        for (var i = 0; i < this.classes.length; i++) {
            if (this.classes[i].id == classId) {
                this.selectedClass = this.classes[i];
            }
        }
        this.getExams(this.selectedClass.id);
        this.cookieService.put("classId", "" + this.selectedClass.id);
        this.cookieService.put("className", this.selectedClass.className);
        this.addingExam = false;
    };
    ExamComponent.prototype.getExams = function (id) {
        var _this = this;
        this.examService
            .getExams(id)
            .then(function (exams) { return _this.exams = exams; })
            .catch(function (error) { return _this.error = error; });
    };
    ExamComponent.prototype.onSelect = function (exam) {
        this.selectedExam = exam;
        this.addingExam = false;
    };
    ExamComponent.prototype.close = function (savedExam) {
        this.addingExam = false;
        if (savedExam) {
            this.getExams(this.selectedClass.id);
        }
    };
    ExamComponent.prototype.gotoEdit = function (exam, event) {
        event.stopPropagation();
        this.router.navigate(['exam/edit', exam.id]);
    };
    ExamComponent.prototype.addExam = function () {
        if (this.selectedClass.id !== undefined) {
            this.addingExam = true;
        }
        this.selectedExam = null;
    };
    ExamComponent.prototype.deleteExam = function (exam, event) {
        var _this = this;
        event.stopPropagation();
        this.examService
            .delete(exam)
            .then(function (res) {
            _this.exams = _this.exams.filter(function (h) { return h !== exam; });
            if (_this.selectedExam === exam) {
                _this.selectedExam = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    ExamComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-exam',
            templateUrl: 'exam.component.html',
            styleUrls: ['exam.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_2.CookieService, class_service_1.ClassService, exam_service_1.ExamService])
    ], ExamComponent);
    return ExamComponent;
}());
exports.ExamComponent = ExamComponent;
//# sourceMappingURL=exam.component.js.map