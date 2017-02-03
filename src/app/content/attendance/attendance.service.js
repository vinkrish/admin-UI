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
var AttendanceService = (function () {
    function AttendanceService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.attendanceUrl = 'http://localhost:8080/guldu/webapi/attendance';
        this.dailyMarkedUrl = 'http://localhost:8080/guldu/webapi/attendance/daily/marked';
        this.dailyUnmarkedUrl = 'http://localhost:8080/guldu/webapi/attendance/daily/unmarked';
        this.sessionMarkedUrl = 'http://localhost:8080/guldu/webapi/attendance/session/marked';
        this.sessionUnmarkedUrl = 'http://localhost:8080/guldu/webapi/attendance/session/unmarked';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.headers.append('Authorization', "Bearer " + this.cookieService.get("auth_token"));
    }
    AttendanceService.prototype.dailyAttendanceMarked = function (sectionId, dateAttendance) {
        var url = this.dailyMarkedUrl + "/section/" + sectionId + "/date/" + dateAttendance;
        return this.http
            .get(url, { headers: this.headers, body: '' })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AttendanceService.prototype.dailyAttendanceUnmarked = function (sectionId, dateAttendance) {
        var url = this.dailyUnmarkedUrl + "/section/" + sectionId + "/date/" + dateAttendance;
        return this.http
            .get(url, { headers: this.headers, body: '' })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AttendanceService.prototype.sessionAttendanceMarked = function (session, sectionId, dateAttendance) {
        var url = this.sessionMarkedUrl + "/" + session + "/" + sectionId + "/" + dateAttendance;
        return this.http
            .get(url, { headers: this.headers, body: '' })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AttendanceService.prototype.sessionAttendanceUnmarked = function (session, sectionId, dateAttendance) {
        var url = this.sessionUnmarkedUrl + "/" + session + "/" + sectionId + "/" + dateAttendance;
        return this.http
            .get(url, { headers: this.headers, body: '' })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AttendanceService.prototype.delete = function (attendance) {
        var url = this.attendanceUrl + "/" + attendance.id;
        return this.http
            .delete(url, { headers: this.headers, body: '' })
            .toPromise()
            .catch(this.handleError);
    };
    AttendanceService.prototype.post = function (attendance) {
        var url = this.attendanceUrl + "/list";
        return this.http
            .post(url, JSON.stringify(attendance), { headers: this.headers })
            .toPromise()
            .catch(this.handleError);
    };
    AttendanceService.prototype.put = function (attendance) {
        var url = this.attendanceUrl + "/" + attendance.id;
        return this.http
            .put(url, JSON.stringify(attendance), { headers: this.headers })
            .toPromise()
            .then(function () { return attendance; })
            .catch(this.handleError);
    };
    AttendanceService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    AttendanceService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, core_2.CookieService])
    ], AttendanceService);
    return AttendanceService;
}());
exports.AttendanceService = AttendanceService;
//# sourceMappingURL=attendance.service.js.map