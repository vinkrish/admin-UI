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
var class_service_1 = require('../class/class.service');
var cce_coscholastic_class_1 = require('./cce-coscholastic-class');
var cce_coscholastic_class_service_1 = require('./cce-coscholastic-class.service');
var core_2 = require('angular2-cookie/core');
var CceCoschClassEditComponent = (function () {
    function CceCoschClassEditComponent(route, cookieService, cccService, classService) {
        this.route = route;
        this.cookieService = cookieService;
        this.cccService = cccService;
        this.classService = classService;
        this.close = new core_1.EventEmitter();
        this.navigated = false;
        this.coScholasticId = +this.cookieService.get("coScholasticId");
        this.coScholasticName = this.cookieService.get("coScholasticName");
    }
    CceCoschClassEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getClasses();
        this.sub = this.route.params.subscribe(function (params) {
            if (params['id'] === undefined) {
                _this.navigated = false;
                _this.cceCoschClass = new cce_coscholastic_class_1.CceCoscholasticClass();
                _this.cceCoschClass.coscholasticId = _this.coScholasticId;
            }
        });
    };
    CceCoschClassEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    CceCoschClassEditComponent.prototype.getClasses = function () {
        var _this = this;
        this.classService
            .getClasses()
            .then(function (classes) { return _this.classes = classes; })
            .catch(function (error) { return _this.error = error; });
    };
    CceCoschClassEditComponent.prototype.classSelected = function (subjectId) {
        for (var i = 0; i < this.classes.length; i++) {
            if (this.classes[i].id == subjectId) {
                this.cceCoschClass.className = this.classes[i].className;
            }
        }
    };
    CceCoschClassEditComponent.prototype.save = function () {
        var _this = this;
        this.cccService
            .save(this.cceCoschClass)
            .then(function (cceCoschClass) {
            _this.cceCoschClass = cceCoschClass;
            _this.goBack(cceCoschClass);
        })
            .catch(function (error) { return _this.error = error; });
    };
    CceCoschClassEditComponent.prototype.goBack = function (savedSection) {
        if (savedSection === void 0) { savedSection = null; }
        this.close.emit(savedSection);
        if (this.navigated) {
            window.history.back();
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CceCoschClassEditComponent.prototype, "close", void 0);
    CceCoschClassEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-ccc-detail',
            templateUrl: 'cce-coscholastic-class-edit.component.html',
            styleUrls: ['cce-coscholastic-class-edit.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, core_2.CookieService, cce_coscholastic_class_service_1.CceCoschClassService, class_service_1.ClassService])
    ], CceCoschClassEditComponent);
    return CceCoschClassEditComponent;
}());
exports.CceCoschClassEditComponent = CceCoschClassEditComponent;
//# sourceMappingURL=cce-coscholastic-class-edit.component.js.map