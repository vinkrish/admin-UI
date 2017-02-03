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
var cce_section_heading_service_1 = require('./cce-section-heading.service');
var cce_coscholastic_service_1 = require('../cce-coscholastic/cce-coscholastic.service');
var core_2 = require('angular2-cookie/core');
var SectionHeadingComponent = (function () {
    function SectionHeadingComponent(router, _cookieService, coschService, sectionHeadingService) {
        this.router = router;
        this._cookieService = _cookieService;
        this.coschService = coschService;
        this.sectionHeadingService = sectionHeadingService;
        this.addingSectionHeading = false;
    }
    SectionHeadingComponent.prototype.ngOnInit = function () {
        this.getCoscholastics();
        this.selectedCosch = new cce_coscholastic_1.CceCoscholastic(0, "");
    };
    SectionHeadingComponent.prototype.getCoscholastics = function () {
        var _this = this;
        this.coschService
            .getCceCoscholastics()
            .then(function (coscholastics) { return _this.coscholastics = coscholastics; })
            .catch(function (error) { return _this.error = error; });
    };
    SectionHeadingComponent.prototype.coschSelected = function (coscholasticId) {
        for (var i = 0; i < this.coscholastics.length; i++) {
            if (this.coscholastics[i].id == coscholasticId) {
                this.selectedCosch = this.coscholastics[i];
            }
        }
        this.getSectionHeadings(this.selectedCosch.id);
        this._cookieService.put("coscholasticId", "" + this.selectedCosch.id);
        this._cookieService.put("coscholasticName", this.selectedCosch.name);
        this.addingSectionHeading = false;
    };
    SectionHeadingComponent.prototype.getSectionHeadings = function (id) {
        var _this = this;
        this.sectionHeadingService
            .getSectionHeadings(id)
            .then(function (sectionHeadings) { return _this.sectionHeadings = sectionHeadings; })
            .catch(function (error) { return _this.error = error; });
    };
    SectionHeadingComponent.prototype.onSelect = function (sectionHeading) {
        this.selectedSectionHeading = sectionHeading;
        this.addingSectionHeading = false;
    };
    SectionHeadingComponent.prototype.close = function (savedSectionHeading) {
        this.addingSectionHeading = false;
        if (savedSectionHeading) {
            this.getSectionHeadings(this.selectedCosch.id);
        }
    };
    SectionHeadingComponent.prototype.addSectionHeading = function () {
        if (this.selectedCosch.id !== 0) {
            this.addingSectionHeading = true;
        }
        this.selectedSectionHeading = null;
    };
    SectionHeadingComponent.prototype.gotoEdit = function (sectionHeading, event) {
        event.stopPropagation();
        this.router.navigate(['cce-section-heading/edit', sectionHeading.id]);
    };
    SectionHeadingComponent.prototype.deleteSectionHeading = function (section, event) {
        var _this = this;
        event.stopPropagation();
        this.sectionHeadingService
            .delete(section)
            .then(function (res) {
            _this.sectionHeadings = _this.sectionHeadings.filter(function (h) { return h !== section; });
            if (_this.selectedSectionHeading === section) {
                _this.selectedSectionHeading = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    SectionHeadingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-cce-section-heading',
            templateUrl: 'cce-section-heading.component.html',
            styleUrls: ['cce-section-heading.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_2.CookieService, cce_coscholastic_service_1.CceCoscholasticService, cce_section_heading_service_1.SectionHeadingService])
    ], SectionHeadingComponent);
    return SectionHeadingComponent;
}());
exports.SectionHeadingComponent = SectionHeadingComponent;
//# sourceMappingURL=cce-section-heading.component.js.map