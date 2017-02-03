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
var class_subject_group_service_1 = require('./class-subject-group.service');
var core_2 = require('angular2-cookie/core');
var ClassSubjectGroupComponent = (function () {
    function ClassSubjectGroupComponent(router, cookieService, classService, csgService) {
        this.router = router;
        this.cookieService = cookieService;
        this.classService = classService;
        this.csgService = csgService;
        this.addingCSG = false;
    }
    ClassSubjectGroupComponent.prototype.ngOnInit = function () {
        this.getClasses();
        this.selectedClass = new clas_1.Clas();
    };
    ClassSubjectGroupComponent.prototype.getClasses = function () {
        var _this = this;
        this.classService
            .getClasses()
            .then(function (classes) { return _this.classes = classes; })
            .catch(function (error) { return _this.error = error; });
    };
    ClassSubjectGroupComponent.prototype.classSelected = function (classId) {
        for (var i = 0; i < this.classes.length; i++) {
            if (this.classes[i].id == classId) {
                this.selectedClass = this.classes[i];
            }
        }
        this.getClassSubjectGroups(this.selectedClass.id);
        this.cookieService.put("classId", "" + this.selectedClass.id);
        this.cookieService.put("className", this.selectedClass.className);
        this.addingCSG = false;
    };
    ClassSubjectGroupComponent.prototype.getClassSubjectGroups = function (id) {
        var _this = this;
        this.csgService
            .getClassSubjectGroups(id)
            .then(function (clasSubjectGroups) { return _this.clasSubjectGroups = clasSubjectGroups; })
            .catch(function (error) { return _this.error = error; });
    };
    ClassSubjectGroupComponent.prototype.onSelect = function (subjectGroupSubject) {
        this.selectedCSG = subjectGroupSubject;
        this.addingCSG = false;
    };
    ClassSubjectGroupComponent.prototype.close = function (savedSGS) {
        this.addingCSG = false;
        if (savedSGS) {
            this.getClassSubjectGroups(this.selectedClass.id);
        }
    };
    ClassSubjectGroupComponent.prototype.addCSG = function () {
        if (this.selectedClass.id !== undefined) {
            this.addingCSG = true;
        }
        this.selectedCSG = null;
    };
    ClassSubjectGroupComponent.prototype.deleteCSG = function (csg, event) {
        var _this = this;
        event.stopPropagation();
        this.csgService
            .delete(csg)
            .then(function (res) {
            _this.clasSubjectGroups = _this.clasSubjectGroups.filter(function (h) { return h !== csg; });
            if (_this.selectedCSG === csg) {
                _this.selectedCSG = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    ClassSubjectGroupComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-class-subject-group',
            templateUrl: 'class-subject-group.component.html',
            styleUrls: ['class-subject-group.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_2.CookieService, class_service_1.ClassService, class_subject_group_service_1.ClassSubjectGroupService])
    ], ClassSubjectGroupComponent);
    return ClassSubjectGroupComponent;
}());
exports.ClassSubjectGroupComponent = ClassSubjectGroupComponent;
//# sourceMappingURL=class-subject-group.component.js.map