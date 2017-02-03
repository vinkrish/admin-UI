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
var subjects_service_1 = require('./subjects.service');
var SubjectsComponent = (function () {
    function SubjectsComponent(router, subjectsService) {
        this.router = router;
        this.subjectsService = subjectsService;
        this.addingSubject = false;
    }
    SubjectsComponent.prototype.ngOnInit = function () {
        this.getSubjects();
    };
    SubjectsComponent.prototype.getSubjects = function () {
        var _this = this;
        this.subjectsService
            .getSubjects()
            .then(function (subjects) { return _this.subjects = subjects; })
            .catch(function (error) { return _this.error = error; });
    };
    SubjectsComponent.prototype.onSelect = function (subject) {
        this.selectedSubject = subject;
        this.addingSubject = false;
    };
    SubjectsComponent.prototype.close = function (savedClass) {
        console.log("class component close function");
        this.addingSubject = false;
        if (savedClass) {
            this.getSubjects();
        }
    };
    SubjectsComponent.prototype.addSubject = function () {
        this.addingSubject = true;
        this.selectedSubject = null;
    };
    SubjectsComponent.prototype.gotoEdit = function (subject, event) {
        event.stopPropagation();
        this.router.navigate(['subject/edit', subject.id]);
    };
    SubjectsComponent.prototype.deleteSubject = function (subject, event) {
        var _this = this;
        event.stopPropagation();
        this.subjectsService
            .delete(subject)
            .then(function (res) {
            _this.subjects = _this.subjects.filter(function (h) { return h !== subject; });
            if (_this.selectedSubject === subject) {
                _this.selectedSubject = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    SubjectsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-subjects',
            templateUrl: 'subjects.component.html',
            styleUrls: ['subjects.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, subjects_service_1.SubjectsService])
    ], SubjectsComponent);
    return SubjectsComponent;
}());
exports.SubjectsComponent = SubjectsComponent;
//# sourceMappingURL=subjects.component.js.map