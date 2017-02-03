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
var HomeworkService = (function () {
    function HomeworkService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.homeworkUrl = 'http://localhost:8080/guldu/webapi/homework';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.headers.append('Authorization', "Bearer " + this.cookieService.get("auth_token"));
    }
    HomeworkService.prototype.getHomeworks = function (sectionId, homeworkDate) {
        var url = this.homeworkUrl + "/section/" + sectionId + "/date/" + homeworkDate;
        return this.http
            .get(url, { headers: this.headers, body: '' })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    HomeworkService.prototype.save = function (homework) {
        if (homework.id) {
            return this.put(homework);
        }
        return this.post(homework);
    };
    HomeworkService.prototype.delete = function (homework) {
        var url = this.homeworkUrl + "/" + homework.id;
        return this.http
            .delete(url, { headers: this.headers, body: '' })
            .toPromise()
            .catch(this.handleError);
    };
    HomeworkService.prototype.post = function (homework) {
        return this.http
            .post(this.homeworkUrl, JSON.stringify(homework), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    HomeworkService.prototype.put = function (homework) {
        var url = this.homeworkUrl + "/" + homework.id;
        return this.http
            .put(url, JSON.stringify(homework), { headers: this.headers })
            .toPromise()
            .then(function () { return homework; })
            .catch(this.handleError);
    };
    HomeworkService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    HomeworkService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, core_2.CookieService])
    ], HomeworkService);
    return HomeworkService;
}());
exports.HomeworkService = HomeworkService;
//# sourceMappingURL=homework.service.js.map