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
var class_service_1 = require('./class.service');
var ClassComponent = (function () {
    function ClassComponent(router, classService) {
        this.router = router;
        this.classService = classService;
        this.addingClass = false;
    }
    ClassComponent.prototype.ngOnInit = function () {
        this.getClasses();
    };
    ClassComponent.prototype.getClasses = function () {
        var _this = this;
        this.classService
            .getClasses()
            .then(function (classes) { return _this.classes = classes; })
            .catch(function (error) { return _this.error = error; });
    };
    ClassComponent.prototype.onSelect = function (clas) {
        this.selectedClass = clas;
        this.addingClass = false;
    };
    ClassComponent.prototype.close = function (savedClass) {
        this.addingClass = false;
        if (savedClass) {
            this.getClasses();
        }
    };
    ClassComponent.prototype.addClass = function () {
        this.addingClass = true;
        this.selectedClass = null;
    };
    ClassComponent.prototype.gotoEdit = function (clas, event) {
        event.stopPropagation();
        this.router.navigate(['class/edit', clas.id]);
    };
    ClassComponent.prototype.deleteClass = function (clas, event) {
        var _this = this;
        event.stopPropagation();
        this.classService
            .delete(clas)
            .then(function (res) {
            _this.classes = _this.classes.filter(function (h) { return h !== clas; });
            if (_this.selectedClass === clas) {
                _this.selectedClass = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    ClassComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-class',
            templateUrl: 'class.component.html',
            styleUrls: ['class.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, class_service_1.ClassService])
    ], ClassComponent);
    return ClassComponent;
}());
exports.ClassComponent = ClassComponent;
//# sourceMappingURL=class.component.js.map