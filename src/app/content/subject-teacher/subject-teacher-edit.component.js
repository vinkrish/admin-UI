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
var teacher_service_1 = require('../teacher/teacher.service');
var subject_teacher_service_1 = require('./subject-teacher.service');
var core_2 = require('angular2-cookie/core');
var SubjectTeacherEditComponent = (function () {
    function SubjectTeacherEditComponent(route, cookieService, teacherService, subjectTeacherService) {
        this.route = route;
        this.cookieService = cookieService;
        this.teacherService = teacherService;
        this.subjectTeacherService = subjectTeacherService;
        this.close = new core_1.EventEmitter();
        this.navigated = false;
        this.className = this.cookieService.get("className");
        this.classId = +this.cookieService.get("classId");
        this.sectionName = this.cookieService.get("sectionName");
        this.sectionId = +this.cookieService.get("sectionId");
    }
    SubjectTeacherEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getTeachers();
        this.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== undefined) {
                var subjectTeacherId = +params['id'];
                _this.navigated = true;
                _this.subjectTeacherService.getSubjectTeacher(_this.sectionId, subjectTeacherId)
                    .then(function (subjectTeacher) {
                    _this.subjectTeacher = subjectTeacher;
                    _this.subjectName = subjectTeacher.subjectName;
                });
            }
        });
    };
    SubjectTeacherEditComponent.prototype.getTeachers = function () {
        var _this = this;
        this.teacherService
            .getTeachers()
            .then(function (teachers) { return _this.teachers = teachers; })
            .catch(function (error) { return _this.error = error; });
    };
    SubjectTeacherEditComponent.prototype.teacherSelected = function (teacherId) {
        for (var i = 0; i < this.teachers.length; i++) {
            if (this.teachers[i].id == teacherId) {
                this.subjectTeacher.teacherName = this.teachers[i].teacherName;
            }
        }
    };
    SubjectTeacherEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    SubjectTeacherEditComponent.prototype.save = function () {
        var _this = this;
        this.subjectTeacherService
            .put(this.subjectTeacher)
            .then(function (subjectTeacher) {
            _this.subjectTeacher = subjectTeacher;
            _this.goBack(subjectTeacher);
        })
            .catch(function (error) { return _this.error = error; });
    };
    SubjectTeacherEditComponent.prototype.goBack = function (savedSubjectTeacher) {
        if (savedSubjectTeacher === void 0) { savedSubjectTeacher = null; }
        this.close.emit(savedSubjectTeacher);
        if (this.navigated) {
            window.history.back();
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SubjectTeacherEditComponent.prototype, "close", void 0);
    SubjectTeacherEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-subject-teacher-detail',
            templateUrl: 'subject-teacher-edit.component.html',
            styleUrls: ['subject-teacher-edit.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, core_2.CookieService, teacher_service_1.TeacherService, subject_teacher_service_1.SubjectTeacherService])
    ], SubjectTeacherEditComponent);
    return SubjectTeacherEditComponent;
}());
exports.SubjectTeacherEditComponent = SubjectTeacherEditComponent;
//# sourceMappingURL=subject-teacher-edit.component.js.map