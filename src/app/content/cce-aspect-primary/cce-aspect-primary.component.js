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
var cce_topic_primary_1 = require('../cce-topic-primary/cce-topic-primary');
var cce_aspect_primary_1 = require('./cce-aspect-primary');
var cce_coscholastic_service_1 = require('../cce-coscholastic/cce-coscholastic.service');
var cce_section_heading_service_1 = require('../cce-section-heading/cce-section-heading.service');
var cce_topic_primary_service_1 = require('../cce-topic-primary/cce-topic-primary.service');
var cce_aspect_primary_service_1 = require('./cce-aspect-primary.service');
var AspectPrimaryComponent = (function () {
    function AspectPrimaryComponent(router, coschService, sectionHeadingService, topicPrimaryService, aspectPrimaryService) {
        this.router = router;
        this.coschService = coschService;
        this.sectionHeadingService = sectionHeadingService;
        this.topicPrimaryService = topicPrimaryService;
        this.aspectPrimaryService = aspectPrimaryService;
        this.addingAspect = false;
    }
    AspectPrimaryComponent.prototype.ngOnInit = function () {
        this.getCoscholastics();
        this.selectedCosch = new cce_coscholastic_1.CceCoscholastic();
        this.selectedSectionHeading = new cce_section_heading_1.CceSectionHeading();
        this.selectedTopicPrimary = new cce_topic_primary_1.CceTopicPrimary();
    };
    AspectPrimaryComponent.prototype.getCoscholastics = function () {
        var _this = this;
        this.coschService
            .getCceCoscholastics()
            .then(function (coscholastics) { return _this.coscholastics = coscholastics; })
            .catch(function (error) { return _this.error = error; });
    };
    AspectPrimaryComponent.prototype.coschSelected = function (coscholasticId) {
        for (var i = 0; i < this.coscholastics.length; i++) {
            if (this.coscholastics[i].id == coscholasticId) {
                this.selectedCosch = this.coscholastics[i];
            }
        }
        this.aspects = null;
        this.getSectionHeadings(this.selectedCosch.id);
        this.selectedSectionHeading = new cce_section_heading_1.CceSectionHeading();
        this.selectedTopicPrimary = new cce_topic_primary_1.CceTopicPrimary();
        this.addingAspect = false;
        //this.selectingSecHead = false;
        this.topicPrimarys = null;
    };
    AspectPrimaryComponent.prototype.getSectionHeadings = function (coscholasticId) {
        var _this = this;
        this.sectionHeadingService
            .getSectionHeadings(coscholasticId)
            .then(function (sectionHeadings) { return _this.sectionHeadings = sectionHeadings; })
            .catch(function (error) { return _this.error = error; });
    };
    AspectPrimaryComponent.prototype.sectionHeadingSelected = function (sectionHeadingId) {
        for (var i = 0; i < this.sectionHeadings.length; i++) {
            if (this.sectionHeadings[i].id == sectionHeadingId) {
                this.selectedSectionHeading = this.sectionHeadings[i];
            }
        }
        this.aspects = null;
        this.selectedTopicPrimary = new cce_topic_primary_1.CceTopicPrimary();
        this.getTopicPrimarys(this.selectedSectionHeading.id);
        this.addingAspect = false;
    };
    AspectPrimaryComponent.prototype.getTopicPrimarys = function (id) {
        var _this = this;
        this.topicPrimaryService
            .getTopicPrimarys(id)
            .then(function (topicPrimarys) { return _this.topicPrimarys = topicPrimarys; })
            .catch(function (error) { return _this.error = error; });
    };
    AspectPrimaryComponent.prototype.topicSelected = function (topicId) {
        for (var i = 0; i < this.topicPrimarys.length; i++) {
            if (this.topicPrimarys[i].id == topicId) {
                this.selectedTopicPrimary = this.topicPrimarys[i];
            }
        }
        this.aspects = null;
        this.getAspects(this.selectedTopicPrimary.id);
        this.addingAspect = false;
    };
    AspectPrimaryComponent.prototype.getAspects = function (id) {
        var _this = this;
        this.aspectPrimaryService
            .getAspectPrimarys(id)
            .then(function (aspectPrimarys) { return _this.aspects = aspectPrimarys; })
            .catch(function (error) { return _this.error = error; });
    };
    AspectPrimaryComponent.prototype.onSelect = function (aspect) {
        this.selectedAspect = aspect;
        this.addingAspect = false;
    };
    AspectPrimaryComponent.prototype.close = function (savedAspect) {
        this.addingAspect = false;
        //if (savedAspect) { this.getTopicPrimarys(this.selectedSectionHeading.id); }
    };
    AspectPrimaryComponent.prototype.add = function () {
        if (this.selectedCosch.id !== undefined && this.selectedSectionHeading.id !== undefined &&
            this.selectedTopicPrimary.id !== undefined) {
            this.aspectPrimary = new cce_aspect_primary_1.CceAspectPrimary();
            this.aspectPrimary.topicId = this.selectedTopicPrimary.id;
            this.addingAspect = true;
        }
        this.selectedAspect = null;
    };
    AspectPrimaryComponent.prototype.deleteAspect = function (aspect, event) {
        var _this = this;
        event.stopPropagation();
        this.aspectPrimaryService
            .delete(aspect)
            .then(function (res) {
            _this.aspects = _this.aspects.filter(function (h) { return h !== aspect; });
            if (_this.selectedAspect === aspect) {
                _this.selectedAspect = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    AspectPrimaryComponent.prototype.save = function () {
        var _this = this;
        this.aspectPrimaryService
            .save(this.aspectPrimary)
            .then(function (aspectPrimary) {
            _this.addingAspect = false;
            _this.aspects = null;
            _this.getAspects(_this.selectedTopicPrimary.id);
        })
            .catch(function (error) { return _this.error = error; });
    };
    AspectPrimaryComponent.prototype.update = function (aspect, event) {
        var _this = this;
        event.stopPropagation();
        this.aspectPrimaryService
            .save(aspect)
            .then(function () { return _this.getTopicPrimarys(_this.selectedSectionHeading.id); })
            .catch(function (error) { return _this.error = error; });
    };
    AspectPrimaryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-cce-aspect-primary',
            templateUrl: 'cce-aspect-primary.component.html',
            styleUrls: ['cce-aspect-primary.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, cce_coscholastic_service_1.CceCoscholasticService, cce_section_heading_service_1.SectionHeadingService, cce_topic_primary_service_1.TopicPrimaryService, cce_aspect_primary_service_1.AspectPrimaryService])
    ], AspectPrimaryComponent);
    return AspectPrimaryComponent;
}());
exports.AspectPrimaryComponent = AspectPrimaryComponent;
//# sourceMappingURL=cce-aspect-primary.component.js.map