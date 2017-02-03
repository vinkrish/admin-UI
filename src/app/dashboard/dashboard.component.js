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
var DashboardComponent = (function () {
    function DashboardComponent(router) {
        this.router = router;
        this.Items1 = [
            { name: 'Class', link: 'class' },
            { name: 'Section', link: 'section' }
        ];
        this.Items2 = [
            { name: 'Attendance', link: 'attendance' },
            { name: 'Homework', link: 'homework' },
            { name: 'Timetable', link: 'timetable' }
        ];
        this.Items3 = [
            { name: 'Subject', link: 'subjects' },
            { name: 'Subject Group', link: 'subject-group' },
            { name: 'Subject Group Subject', link: 'subject-group-subject' },
            { name: 'Subject Teacher', link: 'subject-teacher' },
            { name: 'Subject Student', link: 'subject-student' },
            { name: 'Class Subject Group', link: 'class-subject-group' }
        ];
        this.Items4 = [
            { name: 'Student', link: 'student' },
            { name: 'Teacher', link: 'teacher' }
        ];
    }
    DashboardComponent.prototype.gotoDetail = function (item) {
        var link = ['/', item];
        this.router.navigate(link);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-dashboard',
            templateUrl: 'dashboard.component.html',
            styleUrls: ['dashboard.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map