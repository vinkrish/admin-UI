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
var clas_1 = require('../class/clas');
var class_service_1 = require('../class/class.service');
var grade_class_wise_1 = require('./grade-class-wise');
var grade_class_wise_service_1 = require('./grade-class-wise.service');
var GradeClassWiseComponent = (function () {
    function GradeClassWiseComponent(router, classService, gcwService) {
        this.router = router;
        this.classService = classService;
        this.gcwService = gcwService;
        this.addingGCW = false;
    }
    GradeClassWiseComponent.prototype.ngOnInit = function () {
        this.getClasses();
        this.selectedClass = new clas_1.Clas();
    };
    GradeClassWiseComponent.prototype.getClasses = function () {
        var _this = this;
        this.classService
            .getClasses()
            .then(function (classes) { return _this.classes = classes; })
            .catch(function (error) { return _this.error = error; });
    };
    GradeClassWiseComponent.prototype.classSelected = function (classId) {
        for (var i = 0; i < this.classes.length; i++) {
            if (this.classes[i].id == classId) {
                this.selectedClass = this.classes[i];
            }
        }
        this.addingGCW = false;
        this.getGradesClassWise(this.selectedClass.id);
    };
    GradeClassWiseComponent.prototype.getGradesClassWise = function (id) {
        var _this = this;
        this.gcwService
            .getGradesClassWise(id)
            .then(function (gradesClassWise) { return _this.gradesClassWise = gradesClassWise; })
            .catch(function (error) { return _this.error = error; });
    };
    GradeClassWiseComponent.prototype.onSelect = function (gradesClassWise) {
        this.selectedGCW = gradesClassWise;
        this.addingGCW = false;
    };
    GradeClassWiseComponent.prototype.close = function () {
        this.addingGCW = false;
    };
    GradeClassWiseComponent.prototype.add = function () {
        if (this.selectedClass.id !== undefined) {
            this.gradeClassWise = new grade_class_wise_1.GradeClassWise();
            this.gradeClassWise.classId = this.selectedClass.id;
            this.addingGCW = true;
        }
        this.selectedGCW = null;
    };
    GradeClassWiseComponent.prototype.delete = function (gradeClassWise, event) {
        var _this = this;
        event.stopPropagation();
        this.gcwService
            .delete(gradeClassWise)
            .then(function (res) {
            _this.gradesClassWise = _this.gradesClassWise.filter(function (h) { return h !== gradeClassWise; });
            if (_this.selectedGCW === gradeClassWise) {
                _this.selectedGCW = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    GradeClassWiseComponent.prototype.save = function () {
        var _this = this;
        this.gcwService
            .post(this.gradeClassWise)
            .then(function (gradeClassWise) {
            _this.addingGCW = false;
            //this.selectedClass = new Clas();
            _this.selectedGCW = new grade_class_wise_1.GradeClassWise();
            _this.gradesClassWise = [];
            _this.getGradesClassWise(_this.selectedClass.id);
        })
            .catch(function (error) { return _this.error = error; });
    };
    GradeClassWiseComponent.prototype.update = function (gradeClassWise, event) {
        var _this = this;
        event.stopPropagation();
        this.gcwService
            .save(gradeClassWise)
            .then(function () { return _this.getGradesClassWise(_this.selectedClass.id); })
            .catch(function (error) { return _this.error = error; });
    };
    GradeClassWiseComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-gcw-subject',
            templateUrl: 'grade-class-wise.component.html',
            styleUrls: ['grade-class-wise.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, class_service_1.ClassService, grade_class_wise_service_1.GradeClassWiseService])
    ], GradeClassWiseComponent);
    return GradeClassWiseComponent;
}());
exports.GradeClassWiseComponent = GradeClassWiseComponent;
//# sourceMappingURL=grade-class-wise.component.js.map