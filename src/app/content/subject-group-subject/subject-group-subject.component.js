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
var subject_group_1 = require('../subject-group/subject-group');
var subject_group_service_1 = require('../subject-group/subject-group.service');
var subject_group_subject_service_1 = require('./subject-group-subject.service');
var core_2 = require('angular2-cookie/core');
var SubjectGroupSubjectComponent = (function () {
    function SubjectGroupSubjectComponent(router, cookieService, subjectGroupService, subjectGroupSubjectService) {
        this.router = router;
        this.cookieService = cookieService;
        this.subjectGroupService = subjectGroupService;
        this.subjectGroupSubjectService = subjectGroupSubjectService;
        this.addingSGS = false;
    }
    SubjectGroupSubjectComponent.prototype.ngOnInit = function () {
        this.getSubjectGroups();
        this.selectedSubjectGroup = new subject_group_1.SubjectGroup();
    };
    SubjectGroupSubjectComponent.prototype.getSubjectGroups = function () {
        var _this = this;
        this.subjectGroupService
            .getSubjectGroups()
            .then(function (subjectGroups) { return _this.subjectGroups = subjectGroups; })
            .catch(function (error) { return _this.error = error; });
    };
    SubjectGroupSubjectComponent.prototype.subjectGroupSelected = function (subjectGroupId) {
        for (var i = 0; i < this.subjectGroups.length; i++) {
            if (this.subjectGroups[i].id == subjectGroupId) {
                this.selectedSubjectGroup = this.subjectGroups[i];
            }
        }
        this.getSubjectGroupSubjects(this.selectedSubjectGroup.id);
        this.cookieService.put("subjectGroupId", "" + this.selectedSubjectGroup.id);
        this.cookieService.put("subjectGroupName", this.selectedSubjectGroup.subjectGroupName);
        this.addingSGS = false;
    };
    SubjectGroupSubjectComponent.prototype.getSubjectGroupSubjects = function (id) {
        var _this = this;
        this.subjectGroupSubjectService
            .getSubjectGroupSubjects(id)
            .then(function (subjectGroupSubjects) { return _this.subjectGroupSubjects = subjectGroupSubjects; })
            .catch(function (error) { return _this.error = error; });
    };
    SubjectGroupSubjectComponent.prototype.onSelect = function (subjectGroupSubject) {
        this.selectedSGS = subjectGroupSubject;
        this.addingSGS = false;
    };
    SubjectGroupSubjectComponent.prototype.close = function (savedSGS) {
        this.addingSGS = false;
        if (savedSGS) {
            this.getSubjectGroupSubjects(this.selectedSubjectGroup.id);
        }
    };
    SubjectGroupSubjectComponent.prototype.addSubjectGroupSubject = function () {
        if (this.selectedSubjectGroup.id !== undefined) {
            this.addingSGS = true;
        }
        this.selectedSGS = null;
    };
    SubjectGroupSubjectComponent.prototype.deleteSubjectGroupSubject = function (sgs, event) {
        var _this = this;
        event.stopPropagation();
        this.subjectGroupSubjectService
            .delete(sgs)
            .then(function (res) {
            _this.subjectGroupSubjects = _this.subjectGroupSubjects.filter(function (h) { return h !== sgs; });
            if (_this.selectedSGS === sgs) {
                _this.selectedSGS = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    SubjectGroupSubjectComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-subject-group-subject',
            templateUrl: 'subject-group-subject.component.html',
            styleUrls: ['subject-group-subject.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_2.CookieService, subject_group_service_1.SubjectGroupService, subject_group_subject_service_1.SubjectGroupSubjectService])
    ], SubjectGroupSubjectComponent);
    return SubjectGroupSubjectComponent;
}());
exports.SubjectGroupSubjectComponent = SubjectGroupSubjectComponent;
//# sourceMappingURL=subject-group-subject.component.js.map