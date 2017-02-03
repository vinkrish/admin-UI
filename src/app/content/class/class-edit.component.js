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
var clas_1 = require('./clas');
var attendance_type_1 = require('../../shared/component/attendance-type');
var class_service_1 = require('./class.service');
var ClassEditComponent = (function () {
    function ClassEditComponent(classService, route) {
        this.classService = classService;
        this.route = route;
        this.close = new core_1.EventEmitter();
        this.attendanceTypes = [
            new attendance_type_1.AttendanceType("Daily"),
            new attendance_type_1.AttendanceType("Session"),
            new attendance_type_1.AttendanceType("Period")
        ];
        this.navigated = false;
    }
    ClassEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== undefined) {
                var id = +params['id'];
                _this.navigated = true;
                _this.classService.getClass(id)
                    .then(function (clas) { return _this.clas = clas; });
            }
            else {
                _this.navigated = false;
                _this.clas = new clas_1.Clas();
                _this.clas.attendanceType = _this.attendanceTypes[0].type;
            }
        });
    };
    ClassEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ClassEditComponent.prototype.save = function () {
        var _this = this;
        this.classService
            .save(this.clas)
            .then(function (clas) {
            _this.clas = clas;
            _this.goBack(clas);
        })
            .catch(function (error) { return _this.error = error; });
    };
    ClassEditComponent.prototype.goBack = function (savedClas) {
        if (savedClas === void 0) { savedClas = null; }
        this.close.emit(savedClas);
        if (this.navigated) {
            window.history.back();
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ClassEditComponent.prototype, "close", void 0);
    ClassEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-class-detail',
            templateUrl: 'class-edit.component.html',
            styleUrls: ['class-edit.component.css']
        }), 
        __metadata('design:paramtypes', [class_service_1.ClassService, router_1.ActivatedRoute])
    ], ClassEditComponent);
    return ClassEditComponent;
}());
exports.ClassEditComponent = ClassEditComponent;
//# sourceMappingURL=class-edit.component.js.map