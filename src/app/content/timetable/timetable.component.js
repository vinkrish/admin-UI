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
var timetable_1 = require('./timetable');
var class_service_1 = require('../class/class.service');
var section_service_1 = require('../section/section.service');
var timetable_service_1 = require('./timetable.service');
var subjects_service_1 = require('../subjects/subjects.service');
var core_2 = require('angular2-cookie/core');
var TimetableComponent = (function () {
    function TimetableComponent(router, cookieService, classService, sectionService, timetableService, subjectsService) {
        this.router = router;
        this.cookieService = cookieService;
        this.classService = classService;
        this.sectionService = sectionService;
        this.timetableService = timetableService;
        this.subjectsService = subjectsService;
        this.selectingSection = false;
        this.isNewTimetable = false;
    }
    TimetableComponent.prototype.ngOnInit = function () {
        this.getClasses();
        this.selectedClass = new clas_1.Clas(0, "");
        this.selectedSection = new section_1.Section(0, "");
        this.selectedDay = "";
    };
    TimetableComponent.prototype.getClasses = function () {
        var _this = this;
        this.classService
            .getClasses()
            .then(function (classes) { return _this.classes = classes; })
            .catch(function (error) { return _this.error = error; });
    };
    TimetableComponent.prototype.classSelected = function (classId) {
        for (var i = 0; i < this.classes.length; i++) {
            if (this.classes[i].id == classId) {
                this.selectedClass = this.classes[i];
            }
        }
        this.isNewTimetable = false;
        this.getSections(this.selectedClass.id);
        this.getSubjects(this.selectedClass.id);
        this.selectingSection = false;
        this.timetables = [];
        this.selectedTimetable = [];
        this.selectedDay = "";
        this.days = [];
    };
    TimetableComponent.prototype.getSections = function (id) {
        var _this = this;
        this.sectionService
            .getSections(id)
            .then(function (sections) { return _this.sections = sections; })
            .catch(function (error) { return _this.error = error; });
    };
    TimetableComponent.prototype.sectionSelected = function (sectionId) {
        for (var i = 0; i < this.sections.length; i++) {
            if (this.sections[i].id == sectionId) {
                this.selectedSection = this.sections[i];
            }
        }
        this.isNewTimetable = false;
        this.selectingSection = true;
        this.timetables = [];
        this.selectedTimetable = [];
        this.selectedDay = "";
        this.days = [];
        this.getTimetable(this.selectedSection.id);
    };
    TimetableComponent.prototype.getTimetable = function (sectionId) {
        var _this = this;
        this.timetableService
            .getTimetables(sectionId)
            .then(function (timetables) {
            _this.timetables = timetables;
            _this.days = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        })
            .catch(function (error) { return _this.error = error; });
    };
    TimetableComponent.prototype.daySelected = function (day) {
        this.selectedTimetable = [];
        for (var _i = 0, _a = this.timetables; _i < _a.length; _i++) {
            var timetab = _a[_i];
            if (timetab.dayOfWeek == day) {
                this.selectedTimetable.push(timetab);
            }
        }
    };
    TimetableComponent.prototype.getSubjects = function (id) {
        var _this = this;
        this.subjectsService
            .getClassSubjects(id)
            .then(function (subjects) { return _this.subjects = subjects; })
            .catch(function (error) { return _this.error = error; });
    };
    TimetableComponent.prototype.save = function (timetable, event) {
        var _this = this;
        event.stopPropagation();
        this.timetableService
            .save(timetable)
            .then(function () {
            // this.selectedDay = "";
            // this.days = [];
            // this.timetables = [];
            // this.selectedTimetable = [];
            // this.getTimetable(this.selectedSection.id);
        })
            .catch(function (error) { return _this.error = error; });
    };
    TimetableComponent.prototype.insert = function () {
        var _this = this;
        this.timetableService
            .save(this.newTimetable)
            .then(function () {
            _this.goBack();
            _this.selectedDay = "";
            _this.days = [];
            _this.timetables = [];
            _this.selectedTimetable = [];
            _this.getTimetable(_this.selectedSection.id);
        })
            .catch(function (error) { return _this.error = error; });
    };
    TimetableComponent.prototype.delete = function (timetable, event) {
        var _this = this;
        event.stopPropagation();
        this.timetableService
            .delete(timetable)
            .then(function () {
            _this.selectedDay = "";
            _this.days = [];
            _this.timetables = [];
            _this.selectedTimetable = [];
            _this.getTimetable(_this.selectedSection.id);
        })
            .catch(function (error) { return _this.error = error; });
    };
    TimetableComponent.prototype.add = function () {
        this.newTimetable = new timetable_1.Timetable();
        this.newTimetable.sectionId = this.selectedSection.id;
        this.newTimetable.dayOfWeek = this.selectedDay;
        this.enableNewTimetable();
    };
    TimetableComponent.prototype.enableNewTimetable = function () {
        if (this.selectedDay != "") {
            this.isNewTimetable = true;
        }
    };
    TimetableComponent.prototype.goBack = function () {
        this.newTimetable = null;
        this.isNewTimetable = false;
    };
    TimetableComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-timetable',
            templateUrl: 'timetable.component.html',
            styleUrls: ['timetable.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_2.CookieService, class_service_1.ClassService, section_service_1.SectionService, timetable_service_1.TimetableService, subjects_service_1.SubjectsService])
    ], TimetableComponent);
    return TimetableComponent;
}());
exports.TimetableComponent = TimetableComponent;
//# sourceMappingURL=timetable.component.js.map