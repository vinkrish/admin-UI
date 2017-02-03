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
var ExamService = (function () {
    function ExamService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.examUrl = 'http://localhost:8080/guldu/webapi/exam';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.headers.append('Authorization', "Bearer " + this.cookieService.get("auth_token"));
    }
    ExamService.prototype.getExams = function (id) {
        var url = this.examUrl + "/class/" + id;
        return this.http
            .get(url, { headers: this.headers, body: '' })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ExamService.prototype.getExam = function (classId, examId) {
        return this.getExams(classId)
            .then(function (exams) { return exams.find(function (exam) { return exam.id === examId; }); });
    };
    ExamService.prototype.save = function (exam) {
        if (exam.id) {
            return this.put(exam);
        }
        return this.post(exam);
    };
    ExamService.prototype.delete = function (exam) {
        var url = this.examUrl + "/" + exam.id;
        return this.http
            .delete(url, { headers: this.headers, body: '' })
            .toPromise()
            .catch(this.handleError);
    };
    ExamService.prototype.post = function (exam) {
        return this.http
            .post(this.examUrl, JSON.stringify(exam), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ExamService.prototype.put = function (exam) {
        var url = this.examUrl + "/" + exam.id;
        return this.http
            .put(url, JSON.stringify(exam), { headers: this.headers })
            .toPromise()
            .then(function () { return exam; })
            .catch(this.handleError);
    };
    ExamService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    ExamService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, core_2.CookieService])
    ], ExamService);
    return ExamService;
}());
exports.ExamService = ExamService;
//# sourceMappingURL=exam.service.js.map