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
var section_1 = require('../section/section');
var cce_student_profile_1 = require('./cce-student-profile');
var class_service_1 = require('../class/class.service');
var section_service_1 = require('../section/section.service');
var student_service_1 = require('../student/student.service');
var cce_student_profile_service_1 = require('./cce-student-profile.service');
var core_2 = require('angular2-cookie/core');
var CceStudentProfileComponent = (function () {
    function CceStudentProfileComponent(router, cookieService, classService, sectionService, studentService, cceProfileService) {
        this.router = router;
        this.cookieService = cookieService;
        this.classService = classService;
        this.sectionService = sectionService;
        this.studentService = studentService;
        this.cceProfileService = cceProfileService;
    }
    CceStudentProfileComponent.prototype.ngOnInit = function () {
        this.getClasses();
        this.selectedClass = new clas_1.Clas(0, "");
        this.clearValues();
    };
    CceStudentProfileComponent.prototype.getClasses = function () {
        var _this = this;
        this.classService
            .getClasses()
            .then(function (classes) { return _this.classes = classes; })
            .catch(function (error) { return _this.error = error; });
    };
    CceStudentProfileComponent.prototype.classSelected = function (classId) {
        for (var i = 0; i < this.classes.length; i++) {
            if (this.classes[i].id == classId) {
                this.selectedClass = this.classes[i];
            }
        }
        this.clearValues();
        this.getSections(this.selectedClass.id);
    };
    CceStudentProfileComponent.prototype.getSections = function (id) {
        var _this = this;
        this.sectionService
            .getSections(id)
            .then(function (sections) { return _this.sections = sections; })
            .catch(function (error) { return _this.error = error; });
    };
    CceStudentProfileComponent.prototype.sectionSelected = function (sectionId) {
        for (var i = 0; i < this.sections.length; i++) {
            if (this.sections[i].id == sectionId) {
                this.selectedSection = this.sections[i];
            }
        }
        this.cceProfiles = [];
        this.existingCceProfiles = [];
        this.students = [];
        this.getStudents(this.selectedSection.id);
    };
    CceStudentProfileComponent.prototype.getStudents = function (id) {
        var _this = this;
        this.studentService
            .getStudents(id)
            .then(function (students) {
            _this.students = students;
            _this.initCceProfileStudents();
        })
            .catch(function (error) { return _this.error = error; });
    };
    CceStudentProfileComponent.prototype.initCceProfileStudents = function () {
        for (var i = 0; i < this.students.length; i++) {
            this.initCceProfile(i);
        }
    };
    CceStudentProfileComponent.prototype.initCceProfile = function (index) {
        var profile = new cce_student_profile_1.CceStudentProfile();
        profile.sectionId = this.selectedSection.id;
        profile.studentId = this.students[index].id;
        profile.bloodGroup = "";
        profile.visionLeft = "";
        profile.visionRight = "";
        profile.healthStatus = "";
        profile.ailment = "";
        profile.oralHygiene = "";
        this.cceProfiles.push(profile);
    };
    CceStudentProfileComponent.prototype.getCceProfiles = function () {
        var _this = this;
        this.cceProfileService
            .getCceProfiles(this.selectedSection.id, 1)
            .then(function (existingCceProfiles) {
            _this.existingCceProfiles = existingCceProfiles;
            if (_this.existingCceProfiles.length == 0) {
                _this.isProfilePresent = false;
            }
            else {
                _this.isProfilePresent = true;
                _this.exportCceProfiles();
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    CceStudentProfileComponent.prototype.exportCceProfiles = function () {
        for (var i = 0; i < this.cceProfiles.length; i++) {
            for (var j = 0; j < this.existingCceProfiles.length; j++) {
                if (this.existingCceProfiles[j].studentId == this.cceProfiles[i].studentId) {
                    this.cceProfiles[i].id = this.existingCceProfiles[j].id;
                    this.cceProfiles[i].term = this.existingCceProfiles[j].term;
                    this.cceProfiles[i].fromDate = this.existingCceProfiles[j].fromDate;
                    this.cceProfiles[i].toDate = this.existingCceProfiles[j].toDate;
                    this.cceProfiles[i].totalDays = this.existingCceProfiles[j].totalDays;
                    this.cceProfiles[i].daysAttended = this.existingCceProfiles[j].daysAttended;
                    this.cceProfiles[i].height = this.existingCceProfiles[j].height;
                    this.cceProfiles[i].weight = this.existingCceProfiles[j].weight;
                    this.cceProfiles[i].bloodGroup = this.existingCceProfiles[j].bloodGroup;
                    this.cceProfiles[i].healthStatus = this.existingCceProfiles[j].healthStatus;
                    this.cceProfiles[i].visionLeft = this.existingCceProfiles[j].visionLeft;
                    this.cceProfiles[i].visionRight = this.existingCceProfiles[j].visionRight;
                    this.cceProfiles[i].ailment = this.existingCceProfiles[j].ailment;
                    this.cceProfiles[i].oralHygiene = this.existingCceProfiles[j].oralHygiene;
                }
            }
        }
    };
    CceStudentProfileComponent.prototype.defaultValues = function () {
        for (var i = 0; i < this.cceProfiles.length; i++) {
            this.cceProfiles[i].term = this.term;
            this.cceProfiles[i].totalDays = this.totalDays;
            this.cceProfiles[i].fromDate = this.fromDate;
            this.cceProfiles[i].toDate = this.toDate;
            if (typeof this.cceProfiles[i].daysAttended == 'undefined') {
                this.cceProfiles[i].daysAttended = 0;
            }
            if (typeof this.cceProfiles[i].height == 'undefined') {
                this.cceProfiles[i].height = 0;
            }
            if (typeof this.cceProfiles[i].weight == 'undefined') {
                this.cceProfiles[i].weight = 0;
            }
        }
    };
    CceStudentProfileComponent.prototype.clearValues = function () {
        this.selectedSection = new section_1.Section();
        this.sections = [];
        this.cceProfiles = [];
        this.students = [];
        this.existingCceProfiles = [];
    };
    CceStudentProfileComponent.prototype.save = function () {
        var _this = this;
        this.defaultValues();
        if (this.isProfilePresent) {
            this.cceProfileService
                .put(this.cceProfiles)
                .then()
                .catch(function (error) { return _this.error = error; });
        }
        else {
            this.cceProfileService
                .post(this.cceProfiles)
                .then()
                .catch(function (error) { return _this.error = error; });
        }
    };
    CceStudentProfileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-cce-student-profile',
            templateUrl: 'cce-student-profile.component.html',
            styleUrls: ['cce-student-profile.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_2.CookieService, class_service_1.ClassService, section_service_1.SectionService, student_service_1.StudentService, cce_student_profile_service_1.CceStudentProfileService])
    ], CceStudentProfileComponent);
    return CceStudentProfileComponent;
}());
exports.CceStudentProfileComponent = CceStudentProfileComponent;
//# sourceMappingURL=cce-student-profile.component.js.map