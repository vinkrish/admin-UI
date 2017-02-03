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
var portion_1 = require('./portion');
var portion_service_1 = require('./portion.service');
var class_service_1 = require('../class/class.service');
var class_subject_group_1 = require('../class-subject-group/class-subject-group');
var class_subject_group_service_1 = require('../class-subject-group/class-subject-group.service');
var subject_group_subject_1 = require('../subject-group-subject/subject-group-subject');
var subject_group_subject_service_1 = require('../subject-group-subject/subject-group-subject.service');
var core_2 = require('angular2-cookie/core');
var PortionComponent = (function () {
    function PortionComponent(router, cookieService, classService, csgService, sgsService, portionService) {
        this.router = router;
        this.cookieService = cookieService;
        this.classService = classService;
        this.csgService = csgService;
        this.sgsService = sgsService;
        this.portionService = portionService;
        this.addingPortion = false;
    }
    PortionComponent.prototype.ngOnInit = function () {
        this.getClasses();
        this.selectedClass = new clas_1.Clas(0, "");
        this.selectedCSG = new class_subject_group_1.ClassSubjectGroup();
        this.selectedSGS = new subject_group_subject_1.SubjectGroupSubject();
        this.classSubjectGroups = [];
        this.subjectGroupSubjects = [];
    };
    PortionComponent.prototype.getClasses = function () {
        var _this = this;
        this.classService
            .getClasses()
            .then(function (classes) { return _this.classes = classes; })
            .catch(function (error) { return _this.error = error; });
    };
    PortionComponent.prototype.classSelected = function (classId) {
        for (var i = 0; i < this.classes.length; i++) {
            if (this.classes[i].id == classId) {
                this.selectedClass = this.classes[i];
            }
        }
        this.selectedCSG = new class_subject_group_1.ClassSubjectGroup();
        this.selectedSGS = new subject_group_subject_1.SubjectGroupSubject();
        this.selectedPortion = new portion_1.Portion();
        this.classSubjectGroups = [];
        this.subjectGroupSubjects = [];
        this.portions = [];
        this.getClassSubjectGroups(this.selectedClass.id);
        this.cookieService.put("classId", "" + this.selectedClass.id);
        this.cookieService.put("className", this.selectedClass.className);
        this.addingPortion = false;
    };
    PortionComponent.prototype.getClassSubjectGroups = function (id) {
        var _this = this;
        this.csgService
            .getClassSubjectGroups(id)
            .then(function (classSubjectGroups) { return _this.classSubjectGroups = classSubjectGroups; })
            .catch(function (error) { return _this.error = error; });
    };
    PortionComponent.prototype.csgSelected = function (csgId) {
        for (var i = 0; i < this.classSubjectGroups.length; i++) {
            if (this.classSubjectGroups[i].subjectGroupId == csgId) {
                this.selectedCSG = this.classSubjectGroups[i];
            }
        }
        this.selectedSGS = new subject_group_subject_1.SubjectGroupSubject();
        this.selectedPortion = new portion_1.Portion();
        this.subjectGroupSubjects = [];
        this.portions = [];
        this.getSubjectGroupSubjects(this.selectedCSG.subjectGroupId);
        this.addingPortion = false;
    };
    PortionComponent.prototype.getSubjectGroupSubjects = function (id) {
        var _this = this;
        this.sgsService
            .getSubjectGroupSubjects(id)
            .then(function (subjectGroupSubjects) { return _this.subjectGroupSubjects = subjectGroupSubjects; })
            .catch(function (error) { return _this.error = error; });
    };
    PortionComponent.prototype.sgsSelected = function (subjectId) {
        for (var i = 0; i < this.subjectGroupSubjects.length; i++) {
            if (this.subjectGroupSubjects[i].subjectId == subjectId) {
                this.selectedSGS = this.subjectGroupSubjects[i];
            }
        }
        this.selectedPortion = new portion_1.Portion();
        this.portions = [];
        this.getPortions();
        this.cookieService.put("subjectId", "" + this.selectedSGS.subjectId);
        this.cookieService.put("subjectName", this.selectedSGS.subjectName);
        this.addingPortion = false;
    };
    PortionComponent.prototype.getPortions = function () {
        var _this = this;
        this.portionService
            .getPortions(this.selectedClass.id, this.selectedSGS.subjectId)
            .then(function (portions) { return _this.portions = portions; })
            .catch(function (error) { return _this.error = error; });
    };
    PortionComponent.prototype.onSelect = function (portion) {
        this.selectedPortion = portion;
        this.addingPortion = false;
    };
    PortionComponent.prototype.close = function (savedPortion) {
        this.addingPortion = false;
        if (savedPortion) {
            this.getPortions();
        }
    };
    PortionComponent.prototype.addPortion = function () {
        if (this.selectedClass.id !== 0 && this.selectedCSG.id !== undefined && this.selectedSGS.id !== undefined) {
            this.addingPortion = true;
        }
        this.selectedPortion = null;
    };
    PortionComponent.prototype.gotoEdit = function (portion, event) {
        event.stopPropagation();
        this.router.navigate(['portion/edit', portion.id]);
    };
    PortionComponent.prototype.deletePortion = function (portion, event) {
        var _this = this;
        event.stopPropagation();
        this.portionService
            .delete(portion)
            .then(function (res) {
            _this.portions = _this.portions.filter(function (h) { return h !== portion; });
            if (_this.selectedPortion === portion) {
                _this.selectedPortion = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    PortionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-portion',
            templateUrl: 'portion.component.html',
            styleUrls: ['portion.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_2.CookieService, class_service_1.ClassService, class_subject_group_service_1.ClassSubjectGroupService, subject_group_subject_service_1.SubjectGroupSubjectService, portion_service_1.PortionService])
    ], PortionComponent);
    return PortionComponent;
}());
exports.PortionComponent = PortionComponent;
//# sourceMappingURL=portion.component.js.map