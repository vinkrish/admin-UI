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
var SubjectStudentService = (function () {
    function SubjectStudentService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.subjectStudentUrl = 'http://localhost:8080/guldu/webapi/subjectstudent';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.headers.append('Authorization', "Bearer " + this.cookieService.get("auth_token"));
    }
    SubjectStudentService.prototype.getSubjectStudent = function (sectionId, subjectId) {
        var url = this.subjectStudentUrl + "/section/" + sectionId + "/subject/" + subjectId;
        return this.http
            .get(url, { headers: this.headers, body: '' })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SubjectStudentService.prototype.getSubjectStudents = function (sectionId, subjectGroupId) {
        var url = this.subjectStudentUrl + "/section/" + sectionId + "/subjectGroup/" + subjectGroupId;
        return this.http
            .get(url, { headers: this.headers, body: '' })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SubjectStudentService.prototype.post = function (subjectStudents) {
        var url = this.subjectStudentUrl + "/recent";
        return this.http
            .post(url, JSON.stringify(subjectStudents), { headers: this.headers })
            .toPromise()
            .catch(this.handleError);
    };
    SubjectStudentService.prototype.put = function (subjectStudents) {
        return this.http
            .put(this.subjectStudentUrl, JSON.stringify(subjectStudents), { headers: this.headers })
            .toPromise()
            .catch(this.handleError);
    };
    SubjectStudentService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    SubjectStudentService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, core_2.CookieService])
    ], SubjectStudentService);
    return SubjectStudentService;
}());
exports.SubjectStudentService = SubjectStudentService;
//# sourceMappingURL=subject-student.service.js.map