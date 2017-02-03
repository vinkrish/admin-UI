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
var SectionService = (function () {
    function SectionService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.sectionUrl = 'http://localhost:8080/guldu/webapi/section';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.headers.append('Authorization', "Bearer " + this.cookieService.get("auth_token"));
    }
    SectionService.prototype.getSections = function (id) {
        var url = this.sectionUrl + "/class/" + id;
        return this.http
            .get(url, { headers: this.headers, body: '' })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SectionService.prototype.getSection = function (classId, sectionId) {
        return this.getSections(classId)
            .then(function (sections) { return sections.find(function (section) { return section.id === sectionId; }); });
    };
    SectionService.prototype.save = function (section) {
        if (section.id) {
            return this.put(section);
        }
        return this.post(section);
    };
    SectionService.prototype.delete = function (section) {
        var url = this.sectionUrl + "/" + section.id;
        return this.http
            .delete(url, { headers: this.headers, body: '' })
            .toPromise()
            .catch(this.handleError);
    };
    SectionService.prototype.post = function (section) {
        return this.http
            .post(this.sectionUrl, JSON.stringify(section), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    SectionService.prototype.put = function (section) {
        var url = this.sectionUrl + "/" + section.id;
        return this.http
            .put(url, JSON.stringify(section), { headers: this.headers })
            .toPromise()
            .then(function () { return section; })
            .catch(this.handleError);
    };
    SectionService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    SectionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, core_2.CookieService])
    ], SectionService);
    return SectionService;
}());
exports.SectionService = SectionService;
//# sourceMappingURL=section.service.js.map