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
var subjects_service_1 = require('../subjects/subjects.service');
var subject_group_subject_1 = require('./subject-group-subject');
var subject_group_subject_service_1 = require('./subject-group-subject.service');
var core_2 = require('angular2-cookie/core');
var SubjectGroupSubjectEditComponent = (function () {
    function SubjectGroupSubjectEditComponent(route, cookieService, sgsService, subjectsService) {
        this.route = route;
        this.cookieService = cookieService;
        this.sgsService = sgsService;
        this.subjectsService = subjectsService;
        this.close = new core_1.EventEmitter();
        this.navigated = false;
        this.subjectGroupId = +this.cookieService.get("subjectGroupId");
        this.subjectGroupName = this.cookieService.get("subjectGroupName");
    }
    SubjectGroupSubjectEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getSubjects();
        this.sub = this.route.params.subscribe(function (params) {
            if (params['id'] === undefined) {
                _this.navigated = false;
                _this.subjectGroupSubject = new subject_group_subject_1.SubjectGroupSubject();
                _this.subjectGroupSubject.subjectGroupId = _this.subjectGroupId;
            }
        });
    };
    SubjectGroupSubjectEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    SubjectGroupSubjectEditComponent.prototype.getSubjects = function () {
        var _this = this;
        this.subjectsService
            .getSubjects()
            .then(function (subjects) { return _this.subjects = subjects; })
            .catch(function (error) { return _this.error = error; });
    };
    SubjectGroupSubjectEditComponent.prototype.subjectSelected = function (subjectId) {
        for (var i = 0; i < this.subjects.length; i++) {
            if (this.subjects[i].id == subjectId) {
                this.subjectGroupSubject.subjectName = this.subjects[i].subjectName;
            }
        }
    };
    SubjectGroupSubjectEditComponent.prototype.save = function () {
        var _this = this;
        this.sgsService
            .save(this.subjectGroupSubject)
            .then(function (subjectGroupSubject) {
            _this.subjectGroupSubject = subjectGroupSubject;
            _this.goBack(subjectGroupSubject);
        })
            .catch(function (error) { return _this.error = error; });
    };
    SubjectGroupSubjectEditComponent.prototype.goBack = function (savedSGS) {
        if (savedSGS === void 0) { savedSGS = null; }
        this.close.emit(savedSGS);
        if (this.navigated) {
            window.history.back();
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SubjectGroupSubjectEditComponent.prototype, "close", void 0);
    SubjectGroupSubjectEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-sgs-detail',
            templateUrl: 'subject-group-subject-edit.component.html',
            styleUrls: ['subject-group-subject-edit.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, core_2.CookieService, subject_group_subject_service_1.SubjectGroupSubjectService, subjects_service_1.SubjectsService])
    ], SubjectGroupSubjectEditComponent);
    return SubjectGroupSubjectEditComponent;
}());
exports.SubjectGroupSubjectEditComponent = SubjectGroupSubjectEditComponent;
//# sourceMappingURL=subject-group-subject-edit.component.js.map