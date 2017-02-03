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
var portion_1 = require('./portion');
var portion_service_1 = require('./portion.service');
var core_2 = require('angular2-cookie/core');
var PortionEditComponent = (function () {
    function PortionEditComponent(route, cookieService, portionService) {
        this.route = route;
        this.cookieService = cookieService;
        this.portionService = portionService;
        this.close = new core_1.EventEmitter();
        this.navigated = false;
        this.className = this.cookieService.get("className");
        this.classId = +this.cookieService.get("classId");
        this.subjectName = this.cookieService.get("subjectName");
        this.subjectId = +this.cookieService.get("subjectId");
    }
    PortionEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== undefined) {
                var portionId = +params['id'];
                _this.navigated = true;
                _this.portionService.getPortion(_this.classId, _this.subjectId, portionId)
                    .then(function (portion) {
                    _this.portion = portion;
                });
            }
            else {
                _this.navigated = false;
                _this.portion = new portion_1.Portion();
                _this.portion.classId = _this.classId;
                _this.portion.subjectId = _this.subjectId;
            }
        });
    };
    PortionEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    PortionEditComponent.prototype.save = function () {
        var _this = this;
        this.portionService
            .save(this.portion)
            .then(function (portion) {
            _this.portion = portion;
            _this.goBack(portion);
        })
            .catch(function (error) { return _this.error = error; });
    };
    PortionEditComponent.prototype.goBack = function (savedPortion) {
        if (savedPortion === void 0) { savedPortion = null; }
        this.close.emit(savedPortion);
        if (this.navigated) {
            window.history.back();
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PortionEditComponent.prototype, "close", void 0);
    PortionEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-portion-detail',
            templateUrl: 'portion-edit.component.html',
            styleUrls: ['portion-edit.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, core_2.CookieService, portion_service_1.PortionService])
    ], PortionEditComponent);
    return PortionEditComponent;
}());
exports.PortionEditComponent = PortionEditComponent;
//# sourceMappingURL=portion-edit.component.js.map