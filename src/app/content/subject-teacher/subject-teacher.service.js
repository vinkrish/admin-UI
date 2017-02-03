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
var SubjectTeacherService = (function () {
    function SubjectTeacherService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.subjectTeacherUrl = 'http://localhost:8080/guldu/webapi/subjectteacher';
        this.sharedUrl = 'http://localhost:8080/guldu/webapi/shared/subjectteacher';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.headers.append('Authorization', "Bearer " + this.cookieService.get("auth_token"));
    }
    SubjectTeacherService.prototype.getSubjectTeachers = function (id) {
        var url = this.subjectTeacherUrl + "/section/" + id;
        return this.http
            .get(url, { headers: this.headers, body: '' })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SubjectTeacherService.prototype.getSubjectTeacher = function (sectionId, subjectTeacherId) {
        return this.getSubjectTeachers(sectionId)
            .then(function (subjectTeachers) { return subjectTeachers.find(function (subjectTeacher) { return subjectTeacher.id === subjectTeacherId; }); });
    };
    SubjectTeacherService.prototype.save = function (clas) {
        return this.post(clas);
    };
    SubjectTeacherService.prototype.delete = function (subjectTeacher) {
        var url = this.subjectTeacherUrl + "/" + subjectTeacher.id;
        return this.http
            .delete(url, { headers: this.headers, body: '' })
            .toPromise()
            .catch(this.handleError);
    };
    SubjectTeacherService.prototype.post = function (clas) {
        return this.http
            .post(this.sharedUrl, JSON.stringify(clas), { headers: this.headers })
            .toPromise()
            .catch(this.handleError);
    };
    SubjectTeacherService.prototype.put = function (subjectTeacher) {
        var url = this.subjectTeacherUrl + "/" + subjectTeacher.id;
        return this.http
            .put(url, JSON.stringify(subjectTeacher), { headers: this.headers })
            .toPromise()
            .then(function () { return subjectTeacher; })
            .catch(this.handleError);
    };
    SubjectTeacherService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    SubjectTeacherService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, core_2.CookieService])
    ], SubjectTeacherService);
    return SubjectTeacherService;
}());
exports.SubjectTeacherService = SubjectTeacherService;
//# sourceMappingURL=subject-teacher.service.js.map