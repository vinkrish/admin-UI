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
var subject_group_service_1 = require('./subject-group.service');
var SubjectGroupComponent = (function () {
    function SubjectGroupComponent(router, subjectGroupService) {
        this.router = router;
        this.subjectGroupService = subjectGroupService;
        this.addingSubjectGroup = false;
    }
    SubjectGroupComponent.prototype.ngOnInit = function () {
        this.getSubjectGroups();
    };
    SubjectGroupComponent.prototype.getSubjectGroups = function () {
        var _this = this;
        this.subjectGroupService
            .getSubjectGroups()
            .then(function (subjectGroups) { return _this.subjectGroups = subjectGroups; })
            .catch(function (error) { return _this.error = error; });
    };
    SubjectGroupComponent.prototype.onSelect = function (subjectGroup) {
        this.selectedSubjectGroup = subjectGroup;
        this.addingSubjectGroup = false;
    };
    SubjectGroupComponent.prototype.close = function (savedClass) {
        console.log("class component close function");
        this.addingSubjectGroup = false;
        if (savedClass) {
            this.getSubjectGroups();
        }
    };
    SubjectGroupComponent.prototype.addSubjectGroup = function () {
        this.addingSubjectGroup = true;
        this.selectedSubjectGroup = null;
    };
    SubjectGroupComponent.prototype.gotoEdit = function (subjectGroup, event) {
        event.stopPropagation();
        this.router.navigate(['subject-group/edit', subjectGroup.id]);
    };
    SubjectGroupComponent.prototype.deleteSubjectGroup = function (subjectGroup, event) {
        var _this = this;
        event.stopPropagation();
        this.subjectGroupService
            .delete(subjectGroup)
            .then(function (res) {
            _this.subjectGroups = _this.subjectGroups.filter(function (h) { return h !== subjectGroup; });
            if (_this.selectedSubjectGroup === subjectGroup) {
                _this.selectedSubjectGroup = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    SubjectGroupComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-subject-group',
            templateUrl: 'subject-group.component.html',
            styleUrls: ['subject-group.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, subject_group_service_1.SubjectGroupService])
    ], SubjectGroupComponent);
    return SubjectGroupComponent;
}());
exports.SubjectGroupComponent = SubjectGroupComponent;
//# sourceMappingURL=subject-group.component.js.map