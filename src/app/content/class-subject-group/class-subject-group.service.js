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
var ClassSubjectGroupService = (function () {
    function ClassSubjectGroupService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.csgUrl = 'http://localhost:8080/guldu/webapi/classsubjectgroup';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.headers.append('Authorization', "Bearer " + this.cookieService.get("auth_token"));
    }
    ClassSubjectGroupService.prototype.getClassSubjectGroups = function (id) {
        var url = this.csgUrl + "/class/" + id;
        return this.http
            .get(url, { headers: this.headers, body: '' })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ClassSubjectGroupService.prototype.getClassSubjectGroup = function (id) {
        return this.getClassSubjectGroups(id)
            .then(function (classSubjectGroups) { return classSubjectGroups.find(function (classSubjectGroup) { return classSubjectGroup.id === id; }); });
    };
    ClassSubjectGroupService.prototype.save = function (classSubjectGroup) {
        if (classSubjectGroup.id) {
            return this.put(classSubjectGroup);
        }
        return this.post(classSubjectGroup);
    };
    ClassSubjectGroupService.prototype.delete = function (classSubjectGroup) {
        var url = this.csgUrl + "/" + classSubjectGroup.id;
        return this.http
            .delete(url, { headers: this.headers, body: '' })
            .toPromise()
            .catch(this.handleError);
    };
    ClassSubjectGroupService.prototype.post = function (classSubjectGroup) {
        return this.http
            .post(this.csgUrl, JSON.stringify(classSubjectGroup), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ClassSubjectGroupService.prototype.put = function (classSubjectGroup) {
        var url = this.csgUrl + "/" + classSubjectGroup.id;
        return this.http
            .put(url, JSON.stringify(classSubjectGroup), { headers: this.headers })
            .toPromise()
            .then(function () { return classSubjectGroup; })
            .catch(this.handleError);
    };
    ClassSubjectGroupService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    ClassSubjectGroupService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, core_2.CookieService])
    ], ClassSubjectGroupService);
    return ClassSubjectGroupService;
}());
exports.ClassSubjectGroupService = ClassSubjectGroupService;
//# sourceMappingURL=class-subject-group.service.js.map