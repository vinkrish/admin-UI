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
var section_service_1 = require('./section.service');
var class_service_1 = require('../class/class.service');
var core_2 = require('angular2-cookie/core');
var SectionComponent = (function () {
    function SectionComponent(router, _cookieService, classService, sectionService) {
        this.router = router;
        this._cookieService = _cookieService;
        this.classService = classService;
        this.sectionService = sectionService;
        this.addingSection = false;
    }
    SectionComponent.prototype.ngOnInit = function () {
        this.getClasses();
        this.selectedClass = new clas_1.Clas(0, "");
    };
    SectionComponent.prototype.getClasses = function () {
        var _this = this;
        this.classService
            .getClasses()
            .then(function (classes) { return _this.classes = classes; })
            .catch(function (error) { return _this.error = error; });
    };
    SectionComponent.prototype.classSelected = function (classId) {
        for (var i = 0; i < this.classes.length; i++) {
            if (this.classes[i].id == classId) {
                this.selectedClass = this.classes[i];
            }
        }
        this.getSections(this.selectedClass.id);
        this._cookieService.put("classId", "" + this.selectedClass.id);
        this._cookieService.put("className", this.selectedClass.className);
        //this.addSection();
        this.addingSection = false;
    };
    SectionComponent.prototype.getSections = function (id) {
        var _this = this;
        this.sectionService
            .getSections(id)
            .then(function (sections) { return _this.sections = sections; })
            .catch(function (error) { return _this.error = error; });
    };
    SectionComponent.prototype.onSelect = function (section) {
        this.selectedSection = section;
        this.addingSection = false;
    };
    SectionComponent.prototype.close = function (savedSection) {
        this.addingSection = false;
        if (savedSection) {
            this.getSections(this.selectedClass.id);
        }
    };
    SectionComponent.prototype.addSection = function () {
        if (this.selectedClass.className !== "") {
            this.addingSection = true;
        }
        this.selectedSection = null;
    };
    SectionComponent.prototype.gotoEdit = function (section, event) {
        event.stopPropagation();
        this.router.navigate(['section/edit', section.id]);
    };
    SectionComponent.prototype.deleteSection = function (section, event) {
        var _this = this;
        event.stopPropagation();
        this.sectionService
            .delete(section)
            .then(function (res) {
            _this.sections = _this.sections.filter(function (h) { return h !== section; });
            if (_this.selectedSection === section) {
                _this.selectedSection = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    SectionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-section',
            templateUrl: 'section.component.html',
            styleUrls: ['section.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_2.CookieService, class_service_1.ClassService, section_service_1.SectionService])
    ], SectionComponent);
    return SectionComponent;
}());
exports.SectionComponent = SectionComponent;
//# sourceMappingURL=section.component.js.map