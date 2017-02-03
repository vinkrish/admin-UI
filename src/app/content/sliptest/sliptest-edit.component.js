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
var portion_service_1 = require('../portion/portion.service');
var sliptest_1 = require('./sliptest');
var sliptest_service_1 = require('./sliptest.service');
var core_2 = require('angular2-cookie/core');
var SliptestEditComponent = (function () {
    function SliptestEditComponent(route, cookieService, portionService, sliptestService) {
        this.route = route;
        this.cookieService = cookieService;
        this.portionService = portionService;
        this.sliptestService = sliptestService;
        this.close = new core_1.EventEmitter();
        this.navigated = false;
        this.className = this.cookieService.get("className");
        this.classId = +this.cookieService.get("classId");
        this.sectionName = this.cookieService.get("sectionName");
        this.sectionId = +this.cookieService.get("sectionId");
        this.subjectName = this.cookieService.get("subjectName");
        this.subjectId = +this.cookieService.get("subjectId");
    }
    SliptestEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getPortions();
        this.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== undefined) {
                var sliptestId = +params['id'];
                _this.navigated = true;
                _this.sliptestService.getSliptest(_this.sectionId, _this.subjectId, sliptestId)
                    .then(function (sliptest) {
                    _this.sliptest = sliptest;
                    _this.portionIds = _this.sliptest.portionIds.split(",").map(Number).filter(Boolean);
                });
            }
            else {
                _this.navigated = false;
                _this.sliptest = new sliptest_1.Sliptest();
                _this.sliptest.sectionId = _this.sectionId;
                _this.sliptest.subjectId = _this.subjectId;
            }
        });
    };
    SliptestEditComponent.prototype.getPortions = function () {
        var _this = this;
        this.portionService
            .getPortions(this.classId, this.subjectId)
            .then(function (portions) { return _this.portions = portions; })
            .catch(function (error) { return _this.error = error; });
    };
    SliptestEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    SliptestEditComponent.prototype.save = function () {
        var _this = this;
        this.appendPortionIds();
        this.sliptestService
            .save(this.sliptest)
            .then(function (sliptest) {
            _this.sliptest = sliptest;
            _this.goBack(sliptest);
        })
            .catch(function (error) { return _this.error = error; });
    };
    SliptestEditComponent.prototype.appendPortionIds = function () {
        this.sliptest.portionIds = this.portionIds.map(function (o) { return o; }).join(',');
    };
    SliptestEditComponent.prototype.goBack = function (savedSliptest) {
        if (savedSliptest === void 0) { savedSliptest = null; }
        this.close.emit(savedSliptest);
        if (this.navigated) {
            window.history.back();
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SliptestEditComponent.prototype, "close", void 0);
    SliptestEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-sliptest-detail',
            templateUrl: 'sliptest-edit.component.html',
            styleUrls: ['sliptest-edit.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, core_2.CookieService, portion_service_1.PortionService, sliptest_service_1.SliptestService])
    ], SliptestEditComponent);
    return SliptestEditComponent;
}());
exports.SliptestEditComponent = SliptestEditComponent;
//# sourceMappingURL=sliptest-edit.component.js.map