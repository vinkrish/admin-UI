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
var SubjectsService = (function () {
    function SubjectsService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.subjectUrl = 'http://localhost:8080/guldu/webapi/subject';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.headers.append('Authorization', "Bearer " + this.cookieService.get("auth_token"));
    }
    SubjectsService.prototype.getSubjects = function () {
        var url = this.subjectUrl + "/school/" + +this.cookieService.get("schoolId");
        return this.http
            .get(url, { headers: this.headers, body: '' })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SubjectsService.prototype.getClassSubjects = function (id) {
        var url = this.subjectUrl + "/class/" + id;
        return this.http
            .get(url, { headers: this.headers, body: '' })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SubjectsService.prototype.getPartitionSubjects = function (id) {
        var url = this.subjectUrl + "/" + id;
        return this.http
            .get(url, { headers: this.headers, body: '' })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SubjectsService.prototype.getSubject = function (id) {
        return this.getSubjects()
            .then(function (subjects) { return subjects.find(function (subject) { return subject.id === id; }); });
    };
    SubjectsService.prototype.save = function (subject) {
        if (subject.id) {
            return this.put(subject);
        }
        return this.post(subject);
    };
    SubjectsService.prototype.delete = function (subject) {
        var url = this.subjectUrl + "/" + subject.id;
        return this.http
            .delete(url, { headers: this.headers, body: '' })
            .toPromise()
            .catch(this.handleError);
    };
    SubjectsService.prototype.post = function (subject) {
        subject.schoolId = +this.cookieService.get("schoolId");
        return this.http
            .post(this.subjectUrl, JSON.stringify(subject), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    SubjectsService.prototype.put = function (subject) {
        var url = this.subjectUrl + "/" + subject.id;
        return this.http
            .put(url, JSON.stringify(subject), { headers: this.headers })
            .toPromise()
            .then(function () { return subject; })
            .catch(this.handleError);
    };
    SubjectsService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    SubjectsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, core_2.CookieService])
    ], SubjectsService);
    return SubjectsService;
}());
exports.SubjectsService = SubjectsService;
//# sourceMappingURL=subjects.service.js.map