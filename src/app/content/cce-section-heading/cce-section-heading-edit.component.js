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
var cce_section_heading_1 = require('./cce-section-heading');
var cce_section_heading_service_1 = require('./cce-section-heading.service');
var core_2 = require('angular2-cookie/core');
var SectionHeadingEditComponent = (function () {
    function SectionHeadingEditComponent(route, cookieService, sectionHeadingService) {
        this.route = route;
        this.cookieService = cookieService;
        this.sectionHeadingService = sectionHeadingService;
        this.close = new core_1.EventEmitter();
        this.navigated = false;
        this.coscholasticName = this.cookieService.get("coscholasticName");
        this.coscholasticId = +this.cookieService.get("coscholasticId");
    }
    SectionHeadingEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== undefined) {
                var sectionHeadingId = +params['id'];
                _this.navigated = true;
                _this.sectionHeadingService.getSectionHeading(_this.coscholasticId, sectionHeadingId)
                    .then(function (sectionHeading) {
                    _this.sectionHeading = sectionHeading;
                    _this.sectionHeading.coscholasticId = _this.coscholasticId;
                });
            }
            else {
                _this.navigated = false;
                _this.sectionHeading = new cce_section_heading_1.CceSectionHeading();
                _this.sectionHeading.coscholasticId = _this.coscholasticId;
            }
        });
    };
    SectionHeadingEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    SectionHeadingEditComponent.prototype.save = function () {
        var _this = this;
        this.sectionHeadingService
            .save(this.sectionHeading)
            .then(function (sectionHeading) {
            _this.sectionHeading = sectionHeading;
            _this.goBack(sectionHeading);
        })
            .catch(function (error) { return _this.error = error; });
    };
    SectionHeadingEditComponent.prototype.goBack = function (savedSectionHeading) {
        if (savedSectionHeading === void 0) { savedSectionHeading = null; }
        this.close.emit(savedSectionHeading);
        if (this.navigated) {
            window.history.back();
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SectionHeadingEditComponent.prototype, "close", void 0);
    SectionHeadingEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-cce-section-heading-detail',
            templateUrl: 'cce-section-heading-edit.component.html',
            styleUrls: ['cce-section-heading-edit.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, core_2.CookieService, cce_section_heading_service_1.SectionHeadingService])
    ], SectionHeadingEditComponent);
    return SectionHeadingEditComponent;
}());
exports.SectionHeadingEditComponent = SectionHeadingEditComponent;
//# sourceMappingURL=cce-section-heading-edit.component.js.map