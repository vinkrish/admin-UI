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
var subject_group_1 = require('./subject-group');
var subject_group_service_1 = require('./subject-group.service');
var SubjectGroupEditComponent = (function () {
    function SubjectGroupEditComponent(subjectGroupService, route) {
        this.subjectGroupService = subjectGroupService;
        this.route = route;
        this.close = new core_1.EventEmitter();
        this.navigated = false;
    }
    SubjectGroupEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== undefined) {
                var id = +params['id'];
                _this.navigated = true;
                _this.subjectGroupService.getSubjectGroup(id)
                    .then(function (subjectGroup) { return _this.subjectGroup = subjectGroup; });
            }
            else {
                _this.navigated = false;
                _this.subjectGroup = new subject_group_1.SubjectGroup();
            }
        });
    };
    SubjectGroupEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    SubjectGroupEditComponent.prototype.save = function () {
        var _this = this;
        this.subjectGroupService
            .save(this.subjectGroup)
            .then(function (subjectGroup) {
            _this.subjectGroup = subjectGroup;
            _this.goBack(subjectGroup);
        })
            .catch(function (error) { return _this.error = error; });
    };
    SubjectGroupEditComponent.prototype.goBack = function (savedSubjectGroup) {
        if (savedSubjectGroup === void 0) { savedSubjectGroup = null; }
        this.close.emit(savedSubjectGroup);
        if (this.navigated) {
            window.history.back();
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SubjectGroupEditComponent.prototype, "close", void 0);
    SubjectGroupEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-subject-group-detail',
            templateUrl: 'subject-group-edit.component.html',
            styleUrls: ['subject-group-edit.component.css']
        }), 
        __metadata('design:paramtypes', [subject_group_service_1.SubjectGroupService, router_1.ActivatedRoute])
    ], SubjectGroupEditComponent);
    return SubjectGroupEditComponent;
}());
exports.SubjectGroupEditComponent = SubjectGroupEditComponent;
//# sourceMappingURL=subject-group-edit.component.js.map