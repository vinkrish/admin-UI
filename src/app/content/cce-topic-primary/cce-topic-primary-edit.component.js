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
var cce_topic_primary_1 = require('./cce-topic-primary');
var cce_topic_primary_service_1 = require('./cce-topic-primary.service');
var core_2 = require('angular2-cookie/core');
var TopicPrimaryEditComponent = (function () {
    function TopicPrimaryEditComponent(route, cookieService, topicPrimaryService) {
        this.route = route;
        this.cookieService = cookieService;
        this.topicPrimaryService = topicPrimaryService;
        this.close = new core_1.EventEmitter();
        this.navigated = false;
        this.coscholasticName = this.cookieService.get("coscholasticName");
        this.coscholasticId = +this.cookieService.get("coscholasticId");
        this.sectionHeadingName = this.cookieService.get("sectionHeadingName");
        this.sectionHeadingId = +this.cookieService.get("sectionHeadingId");
    }
    TopicPrimaryEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== undefined) {
                var topicPrimaryId = +params['id'];
                _this.navigated = true;
                _this.topicPrimaryService.getTopicPrimary(_this.coscholasticId, topicPrimaryId)
                    .then(function (sectionHeading) {
                    _this.topicPrimary = sectionHeading;
                    _this.topicPrimary.sectionHeadingId = _this.sectionHeadingId;
                });
            }
            else {
                _this.navigated = false;
                _this.topicPrimary = new cce_topic_primary_1.CceTopicPrimary();
                _this.topicPrimary.sectionHeadingId = _this.sectionHeadingId;
            }
        });
    };
    TopicPrimaryEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    TopicPrimaryEditComponent.prototype.save = function () {
        var _this = this;
        this.topicPrimaryService
            .save(this.topicPrimary)
            .then(function (topicPrimary) {
            _this.topicPrimary = topicPrimary;
            _this.goBack(topicPrimary);
        })
            .catch(function (error) { return _this.error = error; });
    };
    TopicPrimaryEditComponent.prototype.goBack = function (savedTopicPrimary) {
        if (savedTopicPrimary === void 0) { savedTopicPrimary = null; }
        this.close.emit(savedTopicPrimary);
        if (this.navigated) {
            window.history.back();
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TopicPrimaryEditComponent.prototype, "close", void 0);
    TopicPrimaryEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-cce-topic-primary-detail',
            templateUrl: 'cce-topic-primary-edit.component.html',
            styleUrls: ['cce-topic-primary-edit.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, core_2.CookieService, cce_topic_primary_service_1.TopicPrimaryService])
    ], TopicPrimaryEditComponent);
    return TopicPrimaryEditComponent;
}());
exports.TopicPrimaryEditComponent = TopicPrimaryEditComponent;
//# sourceMappingURL=cce-topic-primary-edit.component.js.map