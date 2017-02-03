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
var homework_service_1 = require('./homework.service');
var core_2 = require('angular2-cookie/core');
var HomeworkComponent = (function () {
    function HomeworkComponent(router, cookieService, classService, sectionService, homeworkService) {
        this.router = router;
        this.cookieService = cookieService;
        this.classService = classService;
        this.sectionService = sectionService;
        this.homeworkService = homeworkService;
        this.selectingSection = false;
    }
    HomeworkComponent.prototype.ngOnInit = function () {
        this.getClasses();
        this.selectedClass = new clas_1.Clas(0, "");
        this.selectedSection = new section_1.Section(0, "");
    };
    HomeworkComponent.prototype.getClasses = function () {
        var _this = this;
        this.classService
            .getClasses()
            .then(function (classes) { return _this.classes = classes; })
            .catch(function (error) { return _this.error = error; });
    };
    HomeworkComponent.prototype.classSelected = function (classId) {
        for (var i = 0; i < this.classes.length; i++) {
            if (this.classes[i].id == classId) {
                this.selectedClass = this.classes[i];
            }
        }
        this.getSections(this.selectedClass.id);
        this.cookieService.put("classId", "" + this.selectedClass.id);
        this.cookieService.put("className", this.selectedClass.className);
        this.selectingSection = false;
        this.homeworks = null;
    };
    HomeworkComponent.prototype.getSections = function (id) {
        var _this = this;
        this.sectionService
            .getSections(id)
            .then(function (sections) { return _this.sections = sections; })
            .catch(function (error) { return _this.error = error; });
    };
    HomeworkComponent.prototype.sectionSelected = function (sectionId) {
        for (var i = 0; i < this.sections.length; i++) {
            if (this.sections[i].id == sectionId) {
                this.selectedSection = this.sections[i];
            }
        }
        this.cookieService.put("sectionId", "" + this.selectedSection.id);
        this.cookieService.put("sectionName", this.selectedSection.sectionName);
        this.selectingSection = true;
        this.homeworks = null;
    };
    HomeworkComponent.prototype.getHomeworks = function (id, date) {
        var _this = this;
        this.homeworkService
            .getHomeworks(id, date)
            .then(function (homeworks) {
            _this.homeworks = homeworks;
        })
            .catch(function (error) { return _this.error = error; });
    };
    HomeworkComponent.prototype.fetchHomeworks = function () {
        this.getHomeworks(this.selectedSection.id, this.homeworkDate);
    };
    HomeworkComponent.prototype.save = function (homework, event) {
        var _this = this;
        event.stopPropagation();
        this.homeworkService
            .save(homework)
            .then(function () { return _this.fetchHomeworks(); })
            .catch(function (error) { return _this.error = error; });
    };
    HomeworkComponent.prototype.delete = function (homework, event) {
        var _this = this;
        event.stopPropagation();
        this.homeworkService
            .delete(homework)
            .then(function () { return _this.fetchHomeworks(); })
            .catch(function (error) { return _this.error = error; });
    };
    HomeworkComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-homework',
            templateUrl: 'homework.component.html',
            styleUrls: ['homework.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_2.CookieService, class_service_1.ClassService, section_service_1.SectionService, homework_service_1.HomeworkService])
    ], HomeworkComponent);
    return HomeworkComponent;
}());
exports.HomeworkComponent = HomeworkComponent;
//# sourceMappingURL=homework.component.js.map