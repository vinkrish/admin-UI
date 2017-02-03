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
var CceDashboardComponent = (function () {
    function CceDashboardComponent(router) {
        this.router = router;
        this.Items1 = [
            { name: 'CCE Student Profile', link: 'cce-student-profile' },
            { name: 'CCE Coscholastic', link: 'cce-coscholastic' },
            { name: 'CCE Coscholastic Class', link: 'cce-coscholastic-class' },
            { name: 'CCE Section Heading', link: 'cce-section-heading' }
        ];
        this.Items2 = [
            { name: 'CCE Topic Primary', link: 'cce-topic-primary' },
            { name: 'CCE Aspect Primary', link: 'cce-aspect-primary' },
            { name: 'CCE Topic Grade', link: 'cce-topic-grade' },
            { name: 'CCE Aspect Grade', link: 'cce-aspect-grade' }
        ];
    }
    CceDashboardComponent.prototype.gotoDetail = function (item) {
        var link = ['/', item];
        this.router.navigate(link);
    };
    CceDashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-cce-dashboard',
            templateUrl: 'cce-dashboard.component.html',
            styleUrls: ['cce-dashboard.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], CceDashboardComponent);
    return CceDashboardComponent;
}());
exports.CceDashboardComponent = CceDashboardComponent;
//# sourceMappingURL=cce-dashboard.component.js.map