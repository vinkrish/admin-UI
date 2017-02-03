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
var cce_section_heading_1 = require('../cce-section-heading/cce-section-heading');
var cce_topic_primary_service_1 = require('./cce-topic-primary.service');
var cce_coscholastic_service_1 = require('../cce-coscholastic/cce-coscholastic.service');
var cce_section_heading_service_1 = require('../cce-section-heading/cce-section-heading.service');
var core_2 = require('angular2-cookie/core');
var TopicPrimaryComponent = (function () {
    function TopicPrimaryComponent(router, _cookieService, coschService, sectionHeadingService, topicPrimaryService) {
        this.router = router;
        this._cookieService = _cookieService;
        this.coschService = coschService;
        this.sectionHeadingService = sectionHeadingService;
        this.topicPrimaryService = topicPrimaryService;
        this.selectingSecHead = false;
        this.addingTopicPrimary = false;
    }
    TopicPrimaryComponent.prototype.ngOnInit = function () {
        this.getCoscholastics();
        this.selectedCosch = new cce_coscholastic_1.CceCoscholastic(0, "");
        this.selectedSectionHeading = new cce_section_heading_1.CceSectionHeading(0, "");
    };
    TopicPrimaryComponent.prototype.getCoscholastics = function () {
        var _this = this;
        this.coschService
            .getCceCoscholastics()
            .then(function (coscholastics) { return _this.coscholastics = coscholastics; })
            .catch(function (error) { return _this.error = error; });
    };
    TopicPrimaryComponent.prototype.coschSelected = function (coscholasticId) {
        for (var i = 0; i < this.coscholastics.length; i++) {
            if (this.coscholastics[i].id == coscholasticId) {
                this.selectedCosch = this.coscholastics[i];
            }
        }
        this.getSectionHeadings(this.selectedCosch.id);
        this.selectedSectionHeading = new cce_section_heading_1.CceSectionHeading(0, "");
        this._cookieService.put("coscholasticId", "" + this.selectedCosch.id);
        this._cookieService.put("coscholasticName", this.selectedCosch.name);
        this.addingTopicPrimary = false;
        this.selectingSecHead = false;
        this.topicPrimarys = null;
    };
    TopicPrimaryComponent.prototype.getSectionHeadings = function (coscholasticId) {
        var _this = this;
        this.sectionHeadingService
            .getSectionHeadings(coscholasticId)
            .then(function (sectionHeadings) { return _this.sectionHeadings = sectionHeadings; })
            .catch(function (error) { return _this.error = error; });
    };
    TopicPrimaryComponent.prototype.sectionHeadingSelected = function (sectionHeadingId) {
        for (var i = 0; i < this.sectionHeadings.length; i++) {
            if (this.sectionHeadings[i].id == sectionHeadingId) {
                this.selectedSectionHeading = this.sectionHeadings[i];
            }
        }
        this.getTopicPrimarys(this.selectedSectionHeading.id);
        this._cookieService.put("sectionHeadingId", "" + this.selectedSectionHeading.id);
        this._cookieService.put("sectionHeadingName", this.selectedSectionHeading.name);
        this.addingTopicPrimary = false;
        this.selectingSecHead = true;
    };
    TopicPrimaryComponent.prototype.getTopicPrimarys = function (id) {
        var _this = this;
        this.topicPrimaryService
            .getTopicPrimarys(id)
            .then(function (topicPrimarys) { return _this.topicPrimarys = topicPrimarys; })
            .catch(function (error) { return _this.error = error; });
    };
    TopicPrimaryComponent.prototype.onSelect = function (topicPrimary) {
        this.selectedTopicPrimary = topicPrimary;
        this.addingTopicPrimary = false;
    };
    TopicPrimaryComponent.prototype.close = function (savedSection) {
        this.addingTopicPrimary = false;
        if (savedSection) {
            this.getTopicPrimarys(this.selectedTopicPrimary.id);
        }
    };
    TopicPrimaryComponent.prototype.addTopicPrimary = function () {
        if (this.selectingSecHead) {
            if (this.addingTopicPrimary) {
                this.addingTopicPrimary = false;
            }
            else {
                this.addingTopicPrimary = true;
            }
        }
        this.selectedTopicPrimary = null;
    };
    TopicPrimaryComponent.prototype.gotoEdit = function (topicPrimary, event) {
        event.stopPropagation();
        this.router.navigate(['cce-topic-primary/edit', topicPrimary.id]);
    };
    TopicPrimaryComponent.prototype.deleteTopicPrimary = function (topicPrimary, event) {
        var _this = this;
        event.stopPropagation();
        this.topicPrimaryService
            .delete(topicPrimary)
            .then(function (res) {
            _this.topicPrimarys = _this.topicPrimarys.filter(function (h) { return h !== topicPrimary; });
            if (_this.selectedTopicPrimary === topicPrimary) {
                _this.selectedTopicPrimary = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    TopicPrimaryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-cce-topic-primary',
            templateUrl: 'cce-topic-primary.component.html',
            styleUrls: ['cce-topic-primary.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_2.CookieService, cce_coscholastic_service_1.CceCoscholasticService, cce_section_heading_service_1.SectionHeadingService, cce_topic_primary_service_1.TopicPrimaryService])
    ], TopicPrimaryComponent);
    return TopicPrimaryComponent;
}());
exports.TopicPrimaryComponent = TopicPrimaryComponent;
//# sourceMappingURL=cce-topic-primary.component.js.map