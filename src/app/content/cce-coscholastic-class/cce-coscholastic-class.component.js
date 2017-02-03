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
var cce_coscholastic_1 = require('../cce-coscholastic/cce-coscholastic');
var cce_coscholastic_service_1 = require('../cce-coscholastic/cce-coscholastic.service');
var cce_coscholastic_class_service_1 = require('./cce-coscholastic-class.service');
var core_2 = require('angular2-cookie/core');
var CceCoschClassComponent = (function () {
    function CceCoschClassComponent(router, cookieService, coSchService, cccService) {
        this.router = router;
        this.cookieService = cookieService;
        this.coSchService = coSchService;
        this.cccService = cccService;
        this.addingCCC = false;
    }
    CceCoschClassComponent.prototype.ngOnInit = function () {
        this.getCceCoscholastics();
        this.selectedCosch = new cce_coscholastic_1.CceCoscholastic();
    };
    CceCoschClassComponent.prototype.getCceCoscholastics = function () {
        var _this = this;
        this.coSchService
            .getCceCoscholastics()
            .then(function (cceCoscholastics) { return _this.cceCoscholastics = cceCoscholastics; })
            .catch(function (error) { return _this.error = error; });
    };
    CceCoschClassComponent.prototype.coSchSelected = function (subjectGroupId) {
        //this.selectedClass = null;
        for (var i = 0; i < this.cceCoscholastics.length; i++) {
            if (this.cceCoscholastics[i].id == subjectGroupId) {
                this.selectedCosch = this.cceCoscholastics[i];
            }
        }
        this.getCceCoschClasses(this.selectedCosch.id);
        this.cookieService.put("coScholasticId", "" + this.selectedCosch.id);
        this.cookieService.put("coScholasticName", this.selectedCosch.name);
        this.addingCCC = false;
    };
    CceCoschClassComponent.prototype.getCceCoschClasses = function (id) {
        var _this = this;
        this.cccService
            .getCceCoschClasses(id)
            .then(function (cceCoschClasses) { return _this.cceCoschClasses = cceCoschClasses; })
            .catch(function (error) { return _this.error = error; });
    };
    CceCoschClassComponent.prototype.onSelect = function (subjectGroupSubject) {
        this.selectedCCC = subjectGroupSubject;
        this.addingCCC = false;
    };
    CceCoschClassComponent.prototype.close = function (savedCCC) {
        this.addingCCC = false;
        if (savedCCC) {
            this.getCceCoschClasses(this.selectedCosch.id);
        }
    };
    CceCoschClassComponent.prototype.addCceCoschClass = function () {
        if (this.selectedCosch.id !== undefined) {
            this.addingCCC = true;
        }
        this.selectedCCC = null;
    };
    CceCoschClassComponent.prototype.deleteCceCoschClass = function (ccc, event) {
        var _this = this;
        event.stopPropagation();
        this.cccService
            .delete(ccc)
            .then(function (res) {
            _this.cceCoschClasses = _this.cceCoschClasses.filter(function (h) { return h !== ccc; });
            if (_this.selectedCCC === ccc) {
                _this.selectedCCC = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    CceCoschClassComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-cce-coscholastic-class',
            templateUrl: 'cce-coscholastic-class.component.html',
            styleUrls: ['cce-coscholastic-class.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_2.CookieService, cce_coscholastic_service_1.CceCoscholasticService, cce_coscholastic_class_service_1.CceCoschClassService])
    ], CceCoschClassComponent);
    return CceCoschClassComponent;
}());
exports.CceCoschClassComponent = CceCoschClassComponent;
//# sourceMappingURL=cce-coscholastic-class.component.js.map