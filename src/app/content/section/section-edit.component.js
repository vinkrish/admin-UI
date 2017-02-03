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
var teacher_service_1 = require('../teacher/teacher.service');
var section_1 = require('./section');
var section_service_1 = require('./section.service');
var core_2 = require('angular2-cookie/core');
var SectionEditComponent = (function () {
    function SectionEditComponent(route, cookieService, sectionService, teacherService) {
        this.route = route;
        this.cookieService = cookieService;
        this.sectionService = sectionService;
        this.teacherService = teacherService;
        this.close = new core_1.EventEmitter();
        this.navigated = false;
        this.className = this.cookieService.get("className");
        this.classId = +this.cookieService.get("classId");
    }
    SectionEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getTeachers();
        this.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== undefined) {
                //var ids: string[] = params['id'].split(",");
                //let id = +ids[0];
                //let id2 = +ids[1];
                var sectionId = +params['id'];
                _this.navigated = true;
                _this.sectionService.getSection(_this.classId, sectionId)
                    .then(function (section) {
                    _this.section = section;
                    _this.section.classId = _this.classId;
                });
            }
            else {
                _this.navigated = false;
                _this.section = new section_1.Section();
                _this.section.classId = _this.classId;
            }
        });
    };
    SectionEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    SectionEditComponent.prototype.getTeachers = function () {
        var _this = this;
        this.teacherService
            .getTeachers()
            .then(function (teachers) { return _this.teachers = teachers; })
            .catch(function (error) { return _this.error = error; });
    };
    SectionEditComponent.prototype.save = function () {
        var _this = this;
        this.sectionService
            .save(this.section)
            .then(function (section) {
            _this.section = section;
            _this.goBack(section);
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    SectionEditComponent.prototype.goBack = function (savedSection) {
        if (savedSection === void 0) { savedSection = null; }
        this.close.emit(savedSection);
        if (this.navigated) {
            window.history.back();
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SectionEditComponent.prototype, "close", void 0);
    SectionEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-section-detail',
            templateUrl: 'section-edit.component.html',
            styleUrls: ['section-edit.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, core_2.CookieService, section_service_1.SectionService, teacher_service_1.TeacherService])
    ], SectionEditComponent);
    return SectionEditComponent;
}());
exports.SectionEditComponent = SectionEditComponent;
//# sourceMappingURL=section-edit.component.js.map