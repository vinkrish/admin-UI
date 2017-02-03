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
var cce_coscholastic_service_1 = require('./cce-coscholastic.service');
var CceCoschComponent = (function () {
    function CceCoschComponent(router, cceCoschService) {
        this.router = router;
        this.cceCoschService = cceCoschService;
        this.addingCceCosch = false;
    }
    CceCoschComponent.prototype.ngOnInit = function () {
        this.getCceCoschs();
    };
    CceCoschComponent.prototype.getCceCoschs = function () {
        var _this = this;
        this.cceCoschService
            .getCceCoscholastics()
            .then(function (cceCoschs) { return _this.cceCoschs = cceCoschs; })
            .catch(function (error) { return _this.error = error; });
    };
    CceCoschComponent.prototype.onSelect = function (cceCosch) {
        this.selectedCceCosch = cceCosch;
        this.addingCceCosch = false;
    };
    CceCoschComponent.prototype.close = function (savedClass) {
        this.addingCceCosch = false;
        if (savedClass) {
            this.getCceCoschs();
        }
    };
    CceCoschComponent.prototype.addCosch = function () {
        this.addingCceCosch = true;
        this.selectedCceCosch = null;
    };
    CceCoschComponent.prototype.gotoEdit = function (cceCosch, event) {
        event.stopPropagation();
        this.router.navigate(['cce-coscholastic/edit', cceCosch.id]);
    };
    CceCoschComponent.prototype.deleteCosch = function (cceCosch, event) {
        var _this = this;
        event.stopPropagation();
        this.cceCoschService
            .delete(cceCosch)
            .then(function (res) {
            _this.cceCoschs = _this.cceCoschs.filter(function (h) { return h !== cceCosch; });
            if (_this.selectedCceCosch === cceCosch) {
                _this.selectedCceCosch = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    CceCoschComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-cce-coscholastic',
            templateUrl: 'cce-coscholastic.component.html',
            styleUrls: ['cce-coscholastic.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, cce_coscholastic_service_1.CceCoscholasticService])
    ], CceCoschComponent);
    return CceCoschComponent;
}());
exports.CceCoschComponent = CceCoschComponent;
//# sourceMappingURL=cce-coscholastic.component.js.map