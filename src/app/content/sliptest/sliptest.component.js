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
var sliptest_1 = require('./sliptest');
var sliptest_service_1 = require('./sliptest.service');
var class_service_1 = require('../class/class.service');
var section_service_1 = require('../section/section.service');
var class_subject_group_1 = require('../class-subject-group/class-subject-group');
var class_subject_group_service_1 = require('../class-subject-group/class-subject-group.service');
var subject_group_subject_1 = require('../subject-group-subject/subject-group-subject');
var subject_group_subject_service_1 = require('../subject-group-subject/subject-group-subject.service');
var core_2 = require('angular2-cookie/core');
var SliptestComponent = (function () {
    function SliptestComponent(router, cookieService, classService, sectionService, csgService, sgsService, sliptestService) {
        this.router = router;
        this.cookieService = cookieService;
        this.classService = classService;
        this.sectionService = sectionService;
        this.csgService = csgService;
        this.sgsService = sgsService;
        this.sliptestService = sliptestService;
        this.addingSliptest = false;
    }
    SliptestComponent.prototype.ngOnInit = function () {
        this.getClasses();
        this.selectedClass = new clas_1.Clas(0, "");
        this.clearValues();
    };
    SliptestComponent.prototype.getClasses = function () {
        var _this = this;
        this.classService
            .getClasses()
            .then(function (classes) { return _this.classes = classes; })
            .catch(function (error) { return _this.error = error; });
    };
    SliptestComponent.prototype.classSelected = function (classId) {
        for (var i = 0; i < this.classes.length; i++) {
            if (this.classes[i].id == classId) {
                this.selectedClass = this.classes[i];
            }
        }
        this.clearValues();
        this.getSections(this.selectedClass.id);
        this.getClassSubjectGroups(this.selectedClass.id);
        this.cookieService.put("classId", "" + this.selectedClass.id);
        this.cookieService.put("className", this.selectedClass.className);
        this.addingSliptest = false;
    };
    SliptestComponent.prototype.getSections = function (id) {
        var _this = this;
        this.sectionService
            .getSections(id)
            .then(function (sections) { return _this.sections = sections; })
            .catch(function (error) { return _this.error = error; });
    };
    SliptestComponent.prototype.sectionSelected = function (sectionId) {
        for (var i = 0; i < this.sections.length; i++) {
            if (this.sections[i].id == sectionId) {
                this.selectedSection = this.sections[i];
            }
        }
        this.selectedSliptest = new sliptest_1.Sliptest();
        this.selectedSGS = new subject_group_subject_1.SubjectGroupSubject();
        this.sliptests = [];
        this.cookieService.put("sectionId", "" + this.selectedSection.id);
        this.cookieService.put("sectionName", this.selectedSection.sectionName);
        this.addingSliptest = false;
    };
    SliptestComponent.prototype.getClassSubjectGroups = function (id) {
        var _this = this;
        this.csgService
            .getClassSubjectGroups(id)
            .then(function (classSubjectGroups) { return _this.classSubjectGroups = classSubjectGroups; })
            .catch(function (error) { return _this.error = error; });
    };
    SliptestComponent.prototype.csgSelected = function (csgId) {
        for (var i = 0; i < this.classSubjectGroups.length; i++) {
            if (this.classSubjectGroups[i].subjectGroupId == csgId) {
                this.selectedCSG = this.classSubjectGroups[i];
            }
        }
        this.selectedSGS = new subject_group_subject_1.SubjectGroupSubject();
        this.selectedSliptest = new sliptest_1.Sliptest();
        this.subjectGroupSubjects = [];
        this.sliptests = [];
        this.getSubjectGroupSubjects(this.selectedCSG.subjectGroupId);
        this.addingSliptest = false;
    };
    SliptestComponent.prototype.getSubjectGroupSubjects = function (id) {
        var _this = this;
        this.sgsService
            .getSubjectGroupSubjects(id)
            .then(function (subjectGroupSubjects) { return _this.subjectGroupSubjects = subjectGroupSubjects; })
            .catch(function (error) { return _this.error = error; });
    };
    SliptestComponent.prototype.sgsSelected = function (subjectId) {
        for (var i = 0; i < this.subjectGroupSubjects.length; i++) {
            if (this.subjectGroupSubjects[i].subjectId == subjectId) {
                this.selectedSGS = this.subjectGroupSubjects[i];
            }
        }
        this.selectedSliptest = new sliptest_1.Sliptest();
        this.sliptests = [];
        this.getSliptests();
        this.cookieService.put("subjectId", "" + this.selectedSGS.subjectId);
        this.cookieService.put("subjectName", this.selectedSGS.subjectName);
        this.addingSliptest = false;
    };
    SliptestComponent.prototype.getSliptests = function () {
        var _this = this;
        this.sliptestService
            .getSliptests(this.selectedSection.id, this.selectedSGS.subjectId)
            .then(function (sliptests) { return _this.sliptests = sliptests; })
            .catch(function (error) { return _this.error = error; });
    };
    SliptestComponent.prototype.clearValues = function () {
        this.selectedSection = new section_1.Section();
        this.selectedCSG = new class_subject_group_1.ClassSubjectGroup();
        this.selectedSGS = new subject_group_subject_1.SubjectGroupSubject();
        this.selectedSliptest = new sliptest_1.Sliptest();
        this.sections = [];
        this.classSubjectGroups = [];
        this.subjectGroupSubjects = [];
        this.sliptests = [];
    };
    SliptestComponent.prototype.onSelect = function (sliptest) {
        this.selectedSliptest = sliptest;
        this.addingSliptest = false;
    };
    SliptestComponent.prototype.close = function (savedPortion) {
        this.addingSliptest = false;
        if (savedPortion) {
            this.getSliptests();
        }
    };
    SliptestComponent.prototype.addSliptest = function () {
        if (this.selectedClass.id !== 0 && this.selectedSection.id !== undefined &&
            this.selectedCSG.id !== undefined && this.selectedSGS.id !== undefined) {
            this.addingSliptest = true;
        }
        this.selectedSliptest = null;
    };
    SliptestComponent.prototype.gotoEdit = function (sliptest, event) {
        event.stopPropagation();
        this.router.navigate(['sliptest/edit', sliptest.id]);
    };
    SliptestComponent.prototype.deleteSliptest = function (sliptest, event) {
        var _this = this;
        event.stopPropagation();
        this.sliptestService
            .delete(sliptest)
            .then(function (res) {
            _this.sliptests = _this.sliptests.filter(function (h) { return h !== sliptest; });
            if (_this.selectedSliptest === sliptest) {
                _this.selectedSliptest = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    SliptestComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-sliptest',
            templateUrl: 'sliptest.component.html',
            styleUrls: ['sliptest.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_2.CookieService, class_service_1.ClassService, section_service_1.SectionService, class_subject_group_service_1.ClassSubjectGroupService, subject_group_subject_service_1.SubjectGroupSubjectService, sliptest_service_1.SliptestService])
    ], SliptestComponent);
    return SliptestComponent;
}());
exports.SliptestComponent = SliptestComponent;
//# sourceMappingURL=sliptest.component.js.map