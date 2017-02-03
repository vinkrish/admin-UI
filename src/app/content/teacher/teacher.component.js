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
var teacher_service_1 = require('./teacher.service');
var TeacherComponent = (function () {
    function TeacherComponent(router, teacherService) {
        this.router = router;
        this.teacherService = teacherService;
        this.addingTeacher = false;
    }
    TeacherComponent.prototype.ngOnInit = function () {
        this.getTeachers();
    };
    TeacherComponent.prototype.getTeachers = function () {
        var _this = this;
        this.teacherService
            .getTeachers()
            .then(function (teachers) { return _this.teachers = teachers; })
            .catch(function (error) { return _this.error = error; });
    };
    TeacherComponent.prototype.onSelect = function (teacher) {
        this.selectedTeacher = teacher;
        this.addingTeacher = false;
    };
    TeacherComponent.prototype.close = function (savedTeacher) {
        this.addingTeacher = false;
        if (savedTeacher) {
            this.getTeachers();
        }
    };
    TeacherComponent.prototype.addTeacher = function () {
        this.addingTeacher = true;
        this.selectedTeacher = null;
    };
    TeacherComponent.prototype.gotoEdit = function (teacher, event) {
        event.stopPropagation();
        this.router.navigate(['teacher/edit', teacher.id]);
    };
    TeacherComponent.prototype.deleteTeacher = function (clas, event) {
        var _this = this;
        event.stopPropagation();
        this.teacherService
            .delete(clas)
            .then(function (res) {
            _this.teachers = _this.teachers.filter(function (h) { return h !== clas; });
            if (_this.selectedTeacher === clas) {
                _this.selectedTeacher = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    TeacherComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-teacher',
            templateUrl: 'teacher.component.html',
            styleUrls: ['teacher.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, teacher_service_1.TeacherService])
    ], TeacherComponent);
    return TeacherComponent;
}());
exports.TeacherComponent = TeacherComponent;
//# sourceMappingURL=teacher.component.js.map