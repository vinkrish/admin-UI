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
var ActivityService = (function () {
    function ActivityService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.activityUrl = 'http://localhost:8080/guldu/webapi/activity';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.headers.append('Authorization', "Bearer " + this.cookieService.get("auth_token"));
    }
    ActivityService.prototype.getActivities = function (sectionId, examId, subjectId) {
        var url = this.activityUrl + "/section/" + sectionId + "/exam/" + examId + "/subject/" + subjectId;
        return this.http
            .get(url, { headers: this.headers, body: '' })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ActivityService.prototype.save = function (activity) {
        if (activity.id) {
            return this.put(activity);
        }
        return this.post(activity);
    };
    ActivityService.prototype.delete = function (activity) {
        var url = this.activityUrl + "/" + activity.id;
        return this.http
            .delete(url, { headers: this.headers, body: '' })
            .toPromise()
            .catch(this.handleError);
    };
    ActivityService.prototype.post = function (activity) {
        return this.http
            .post(this.activityUrl, JSON.stringify(activity), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ActivityService.prototype.put = function (activity) {
        return this.http
            .put(this.activityUrl, JSON.stringify(activity), { headers: this.headers })
            .toPromise()
            .then(function () { return activity; })
            .catch(this.handleError);
    };
    ActivityService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    ActivityService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, core_2.CookieService])
    ], ActivityService);
    return ActivityService;
}());
exports.ActivityService = ActivityService;
//# sourceMappingURL=activity.service.js.map