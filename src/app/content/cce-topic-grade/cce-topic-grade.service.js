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
var TopicGradeService = (function () {
    function TopicGradeService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.topicGradeUrl = 'http://localhost:8080/guldu/webapi/ccetopicgrade';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.headers.append('Authorization', "Bearer " + this.cookieService.get("auth_token"));
    }
    TopicGradeService.prototype.getTopicGrades = function (id) {
        var url = this.topicGradeUrl + "/topicprimary/" + id;
        return this.http
            .get(url, { headers: this.headers, body: '' })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    TopicGradeService.prototype.getTopicGrade = function (topicPrimaryId, topicGradeId) {
        return this.getTopicGrades(topicPrimaryId)
            .then(function (aspectPrimarys) { return aspectPrimarys.find(function (topicGrade) { return topicGrade.id === topicGradeId; }); });
    };
    TopicGradeService.prototype.save = function (topicGrade) {
        if (topicGrade.id) {
            return this.put(topicGrade);
        }
        return this.post(topicGrade);
    };
    TopicGradeService.prototype.delete = function (topicGrade) {
        var url = this.topicGradeUrl + "/" + topicGrade.id;
        return this.http
            .delete(url, { headers: this.headers, body: '' })
            .toPromise()
            .catch(this.handleError);
    };
    TopicGradeService.prototype.post = function (topicGrade) {
        return this.http
            .post(this.topicGradeUrl, JSON.stringify(topicGrade), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    TopicGradeService.prototype.put = function (topicGrade) {
        var url = this.topicGradeUrl + "/" + topicGrade.id;
        return this.http
            .put(url, JSON.stringify(topicGrade), { headers: this.headers })
            .toPromise()
            .then(function () { return topicGrade; })
            .catch(this.handleError);
    };
    TopicGradeService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    TopicGradeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, core_2.CookieService])
    ], TopicGradeService);
    return TopicGradeService;
}());
exports.TopicGradeService = TopicGradeService;
//# sourceMappingURL=cce-topic-grade.service.js.map