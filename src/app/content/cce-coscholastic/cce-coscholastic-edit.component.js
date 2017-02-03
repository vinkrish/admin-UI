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
var cce_coscholastic_1 = require('./cce-coscholastic');
var cce_coscholastic_service_1 = require('./cce-coscholastic.service');
var CceCoschEditComponent = (function () {
    function CceCoschEditComponent(coschService, route) {
        this.coschService = coschService;
        this.route = route;
        this.close = new core_1.EventEmitter();
        this.navigated = false;
    }
    CceCoschEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== undefined) {
                var id = +params['id'];
                _this.navigated = true;
                _this.coschService.getCceCoscholastic(id)
                    .then(function (cceCosch) { return _this.cceCosch = cceCosch; });
            }
            else {
                _this.navigated = false;
                _this.cceCosch = new cce_coscholastic_1.CceCoscholastic();
            }
        });
    };
    CceCoschEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    CceCoschEditComponent.prototype.save = function () {
        var _this = this;
        this.coschService
            .save(this.cceCosch)
            .then(function (cceCosch) {
            _this.cceCosch = cceCosch;
            _this.goBack(cceCosch);
        })
            .catch(function (error) { return _this.error = error; });
    };
    CceCoschEditComponent.prototype.goBack = function (savedCceCosch) {
        if (savedCceCosch === void 0) { savedCceCosch = null; }
        this.close.emit(savedCceCosch);
        if (this.navigated) {
            window.history.back();
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CceCoschEditComponent.prototype, "close", void 0);
    CceCoschEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-cce-coscholastic-detail',
            templateUrl: 'cce-coscholastic-edit.component.html',
            styleUrls: ['cce-coscholastic-edit.component.css']
        }), 
        __metadata('design:paramtypes', [cce_coscholastic_service_1.CceCoscholasticService, router_1.ActivatedRoute])
    ], CceCoschEditComponent);
    return CceCoschEditComponent;
}());
exports.CceCoschEditComponent = CceCoschEditComponent;
//# sourceMappingURL=cce-coscholastic-edit.component.js.map