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
var router_1 = require('@angular/router');
var exam_1 = require('./exam');
var exam_service_1 = require('./exam.service');
var core_2 = require('angular2-cookie/core');
var ExamEditComponent = (function () {
    function ExamEditComponent(cookieService, examService, route) {
        this.cookieService = cookieService;
        this.examService = examService;
        this.route = route;
        this.close = new core_1.EventEmitter();
        this.navigated = false;
        this.classId = +this.cookieService.get("classId");
        this.className = this.cookieService.get("className");
    }
    ExamEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== undefined) {
                var id = +params['id'];
                _this.navigated = true;
                _this.examService.getExam(_this.classId, id)
                    .then(function (exam) {
                    _this.exam = exam;
                });
            }
            else {
                _this.navigated = false;
                _this.exam = new exam_1.Exam();
                _this.exam.classId = _this.classId;
            }
        });
    };
    ExamEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ExamEditComponent.prototype.save = function () {
        var _this = this;
        this.examService
            .save(this.exam)
            .then(function (exam) {
            _this.exam = exam;
            _this.goBack(exam);
        })
            .catch(function (error) { return _this.error = error; });
    };
    ExamEditComponent.prototype.goBack = function (savedExam) {
        if (savedExam === void 0) { savedExam = null; }
        this.close.emit(savedExam);
        if (this.navigated) {
            window.history.back();
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ExamEditComponent.prototype, "close", void 0);
    ExamEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-exam-detail',
            templateUrl: 'exam-edit.component.html',
            styleUrls: ['exam-edit.component.css']
        }), 
        __metadata('design:paramtypes', [core_2.CookieService, exam_service_1.ExamService, router_1.ActivatedRoute])
    ], ExamEditComponent);
    return ExamEditComponent;
}());
exports.ExamEditComponent = ExamEditComponent;
//# sourceMappingURL=exam-edit.component.js.map