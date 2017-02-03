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
var subjects_1 = require('./subjects');
var partition_1 = require('./partition');
var subjects_service_1 = require('./subjects.service');
var SubjectsEditComponent = (function () {
    function SubjectsEditComponent(subjectsService, route) {
        this.subjectsService = subjectsService;
        this.route = route;
        this.partitionView = false;
        this.close = new core_1.EventEmitter();
        this.partitions = [
            new partition_1.Partition(0),
            new partition_1.Partition(1),
            new partition_1.Partition(2)
        ];
        this.navigated = false;
    }
    SubjectsEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== undefined) {
                var id_1 = +params['id'];
                _this.navigated = true;
                _this.subjectsService.getSubjects()
                    .then(function (subjects) {
                    _this.subjects = subjects;
                    _this.subject = _this.subjects.find(function (sub) { return sub.id === id_1; });
                    _this.togglePartition();
                });
            }
            else {
                _this.navigated = false;
                _this.subject = new subjects_1.Subjects();
                _this.subjectsService.getSubjects()
                    .then(function (subjects) {
                    _this.subjects = subjects;
                });
            }
        });
    };
    SubjectsEditComponent.prototype.togglePartition = function () {
        if (this.subject.partitionType == 1) {
            this.partitionView = true;
        }
        else {
            this.partitionView = false;
            this.subject.theorySubjectId = 0;
            this.subject.practicalSubjectId = 0;
        }
    };
    SubjectsEditComponent.prototype.onTheorySubjectAssigned = function (subjectId) {
        this.subject.theorySubjectId = subjectId;
    };
    SubjectsEditComponent.prototype.onPracticalSubjectAssigned = function (subjectId) {
        this.subject.practicalSubjectId = subjectId;
    };
    SubjectsEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    SubjectsEditComponent.prototype.save = function () {
        var _this = this;
        this.subjectsService
            .save(this.subject)
            .then(function (subject) {
            _this.subject = subject;
            _this.goBack(subject);
        })
            .catch(function (error) { return _this.error = error; });
    };
    SubjectsEditComponent.prototype.goBack = function (savedSubject) {
        if (savedSubject === void 0) { savedSubject = null; }
        this.close.emit(savedSubject);
        if (this.navigated) {
            window.history.back();
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SubjectsEditComponent.prototype, "close", void 0);
    SubjectsEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-subjects-detail',
            templateUrl: 'subjects-edit.component.html',
            styleUrls: ['subjects-edit.component.css']
        }), 
        __metadata('design:paramtypes', [subjects_service_1.SubjectsService, router_1.ActivatedRoute])
    ], SubjectsEditComponent);
    return SubjectsEditComponent;
}());
exports.SubjectsEditComponent = SubjectsEditComponent;
//# sourceMappingURL=subjects-edit.component.js.map