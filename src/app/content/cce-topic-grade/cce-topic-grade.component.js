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
var cce_topic_grade_1 = require('./cce-topic-grade');
var cce_coscholastic_service_1 = require('../cce-coscholastic/cce-coscholastic.service');
var cce_section_heading_service_1 = require('../cce-section-heading/cce-section-heading.service');
var cce_topic_primary_service_1 = require('../cce-topic-primary/cce-topic-primary.service');
var cce_topic_grade_service_1 = require('./cce-topic-grade.service');
var TopicGradeComponent = (function () {
    function TopicGradeComponent(router, coschService, sectionHeadingService, topicPrimaryService, topicGradeService) {
        this.router = router;
        this.coschService = coschService;
        this.sectionHeadingService = sectionHeadingService;
        this.topicPrimaryService = topicPrimaryService;
        this.topicGradeService = topicGradeService;
        this.addingTopicGrade = false;
    }
    TopicGradeComponent.prototype.ngOnInit = function () {
        this.getCoscholastics();
        this.selectedCosch = new cce_coscholastic_1.CceCoscholastic();
        this.selectedSectionHeading = new cce_section_heading_1.CceSectionHeading();
        this.selectedTopicPrimary = new cce_topic_primary_1.CceTopicPrimary();
    };
    TopicGradeComponent.prototype.getCoscholastics = function () {
        var _this = this;
        this.coschService
            .getCceCoscholastics()
            .then(function (coscholastics) { return _this.coscholastics = coscholastics; })
            .catch(function (error) { return _this.error = error; });
    };
    TopicGradeComponent.prototype.coschSelected = function (coscholasticId) {
        for (var i = 0; i < this.coscholastics.length; i++) {
            if (this.coscholastics[i].id == coscholasticId) {
                this.selectedCosch = this.coscholastics[i];
            }
        }
        this.topicGrades = null;
        this.getSectionHeadings(this.selectedCosch.id);
        this.selectedSectionHeading = new cce_section_heading_1.CceSectionHeading();
        this.selectedTopicPrimary = new cce_topic_primary_1.CceTopicPrimary();
        this.addingTopicGrade = false;
        //this.selectingSecHead = false;
        this.topicPrimarys = null;
    };
    TopicGradeComponent.prototype.getSectionHeadings = function (coscholasticId) {
        var _this = this;
        this.sectionHeadingService
            .getSectionHeadings(coscholasticId)
            .then(function (sectionHeadings) { return _this.sectionHeadings = sectionHeadings; })
            .catch(function (error) { return _this.error = error; });
    };
    TopicGradeComponent.prototype.sectionHeadingSelected = function (sectionHeadingId) {
        for (var i = 0; i < this.sectionHeadings.length; i++) {
            if (this.sectionHeadings[i].id == sectionHeadingId) {
                this.selectedSectionHeading = this.sectionHeadings[i];
            }
        }
        this.topicGrades = null;
        this.selectedTopicPrimary = new cce_topic_primary_1.CceTopicPrimary();
        this.getTopicPrimarys(this.selectedSectionHeading.id);
        this.addingTopicGrade = false;
    };
    TopicGradeComponent.prototype.getTopicPrimarys = function (id) {
        var _this = this;
        this.topicPrimaryService
            .getTopicPrimarys(id)
            .then(function (topicPrimarys) { return _this.topicPrimarys = topicPrimarys; })
            .catch(function (error) { return _this.error = error; });
    };
    TopicGradeComponent.prototype.topicSelected = function (topicId) {
        for (var i = 0; i < this.topicPrimarys.length; i++) {
            if (this.topicPrimarys[i].id == topicId) {
                this.selectedTopicPrimary = this.topicPrimarys[i];
            }
        }
        this.topicGrades = null;
        this.getTopicGrades(this.selectedTopicPrimary.id);
        this.addingTopicGrade = false;
    };
    TopicGradeComponent.prototype.getTopicGrades = function (id) {
        var _this = this;
        this.topicGradeService
            .getTopicGrades(id)
            .then(function (aspectPrimarys) { return _this.topicGrades = aspectPrimarys; })
            .catch(function (error) { return _this.error = error; });
    };
    TopicGradeComponent.prototype.onSelect = function (topicGrade) {
        this.selectedTopicGrade = topicGrade;
        this.addingTopicGrade = false;
    };
    TopicGradeComponent.prototype.close = function (savedTopicGrade) {
        this.addingTopicGrade = false;
        //if (savedAspect) { this.getTopicPrimarys(this.selectedSectionHeading.id); }
    };
    TopicGradeComponent.prototype.add = function () {
        if (this.selectedCosch.id !== undefined && this.selectedSectionHeading.id !== undefined &&
            this.selectedTopicPrimary.id !== undefined) {
            this.topicGrade = new cce_topic_grade_1.CceTopicGrade();
            this.topicGrade.topicId = this.selectedTopicPrimary.id;
            this.addingTopicGrade = true;
        }
        this.selectedTopicGrade = null;
    };
    TopicGradeComponent.prototype.delete = function (topicGrade, event) {
        var _this = this;
        event.stopPropagation();
        this.topicGradeService
            .delete(topicGrade)
            .then(function (res) {
            _this.topicGrades = _this.topicGrades.filter(function (h) { return h !== topicGrade; });
            if (_this.selectedTopicGrade === topicGrade) {
                _this.selectedTopicGrade = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    TopicGradeComponent.prototype.save = function () {
        var _this = this;
        this.topicGradeService
            .save(this.topicGrade)
            .then(function (topicGrade) {
            _this.addingTopicGrade = false;
            _this.topicGrades = null;
            _this.getTopicGrades(_this.selectedTopicPrimary.id);
        })
            .catch(function (error) { return _this.error = error; });
    };
    TopicGradeComponent.prototype.update = function (topicGrade, event) {
        var _this = this;
        event.stopPropagation();
        this.topicGradeService
            .save(topicGrade)
            .then(function () { return _this.getTopicPrimarys(_this.selectedSectionHeading.id); })
            .catch(function (error) { return _this.error = error; });
    };
    TopicGradeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-cce-topic-grade',
            templateUrl: 'cce-topic-grade.component.html',
            styleUrls: ['cce-topic-grade.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, cce_coscholastic_service_1.CceCoscholasticService, cce_section_heading_service_1.SectionHeadingService, cce_topic_primary_service_1.TopicPrimaryService, cce_topic_grade_service_1.TopicGradeService])
    ], TopicGradeComponent);
    return TopicGradeComponent;
}());
exports.TopicGradeComponent = TopicGradeComponent;
//# sourceMappingURL=cce-topic-grade.component.js.map