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
var ExamDashboardComponent = (function () {
    function ExamDashboardComponent(router) {
        this.router = router;
        this.Items1 = [
            { name: 'Exam', link: 'exam' },
            { name: 'Exam Subject Group', link: 'exam-subject-group' },
            { name: 'Exam Subject', link: 'exam-subject' },
            { name: 'Mark', link: 'mark' }
        ];
        this.Items2 = [
            { name: 'Activity', link: 'activity' },
            { name: 'Sub-Activity', link: 'subactivity' },
            { name: 'Activity Score', link: 'activity-score' },
            { name: 'SubActivity Score', link: 'subactivity-score' }
        ];
        this.Items3 = [
            { name: 'Portion', link: 'portion' },
            { name: 'Sliptest', link: 'sliptest' },
            { name: 'Sliptest Score', link: 'sliptest-score' }
        ];
        this.Items4 = [
            { name: 'Grade Class Wise', link: 'grade-class-wise' }
        ];
    }
    ExamDashboardComponent.prototype.gotoDetail = function (item) {
        console.log(item);
        var link = ['/', item];
        this.router.navigate(link);
    };
    ExamDashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-exam-dashboard',
            templateUrl: 'exam-dashboard.component.html',
            styleUrls: ['exam-dashboard.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], ExamDashboardComponent);
    return ExamDashboardComponent;
}());
exports.ExamDashboardComponent = ExamDashboardComponent;
//# sourceMappingURL=exam-dashboard.component.js.map