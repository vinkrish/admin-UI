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
var http_1 = require('@angular/http');
var core_2 = require('angular2-cookie/core');
require('rxjs/add/operator/toPromise');
var TopicPrimaryService = (function () {
    function TopicPrimaryService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.topicPrimaryUrl = 'http://localhost:8080/guldu/webapi/ccetopicprimary';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.headers.append('Authorization', "Bearer " + this.cookieService.get("auth_token"));
    }
    TopicPrimaryService.prototype.getTopicPrimarys = function (id) {
        var url = this.topicPrimaryUrl + "/sectionheading/" + id;
        return this.http
            .get(url, { headers: this.headers, body: '' })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    TopicPrimaryService.prototype.getTopicPrimary = function (sectionHeadingId, topicPrimaryId) {
        return this.getTopicPrimarys(sectionHeadingId)
            .then(function (topicPrimarys) { return topicPrimarys.find(function (topicPrimary) { return topicPrimary.id === topicPrimaryId; }); });
    };
    TopicPrimaryService.prototype.save = function (topicPrimary) {
        if (topicPrimary.id) {
            return this.put(topicPrimary);
        }
        return this.post(topicPrimary);
    };
    TopicPrimaryService.prototype.delete = function (topicPrimary) {
        var url = this.topicPrimaryUrl + "/" + topicPrimary.id;
        return this.http
            .delete(url, { headers: this.headers, body: '' })
            .toPromise()
            .catch(this.handleError);
    };
    TopicPrimaryService.prototype.post = function (topicPrimary) {
        return this.http
            .post(this.topicPrimaryUrl, JSON.stringify(topicPrimary), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    TopicPrimaryService.prototype.put = function (topicPrimary) {
        var url = this.topicPrimaryUrl + "/" + topicPrimary.id;
        return this.http
            .put(url, JSON.stringify(topicPrimary), { headers: this.headers })
            .toPromise()
            .then(function () { return topicPrimary; })
            .catch(this.handleError);
    };
    TopicPrimaryService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    TopicPrimaryService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, core_2.CookieService])
    ], TopicPrimaryService);
    return TopicPrimaryService;
}());
exports.TopicPrimaryService = TopicPrimaryService;
//# sourceMappingURL=cce-topic-primary.service.js.map