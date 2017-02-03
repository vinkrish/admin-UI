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
var leave_type_1 = require('./leave-type');
var session_1 = require('./session');
var timetable_service_1 = require('../timetable/timetable.service');
var class_service_1 = require('../class/class.service');
var section_service_1 = require('../section/section.service');
var attendance_service_1 = require('./attendance.service');
var core_2 = require('angular2-cookie/core');
var AttendanceComponent = (function () {
    function AttendanceComponent(router, cookieService, classService, sectionService, timetableService, attendanceService) {
        this.router = router;
        this.cookieService = cookieService;
        this.classService = classService;
        this.sectionService = sectionService;
        this.timetableService = timetableService;
        this.attendanceService = attendanceService;
        this.selectingSection = false;
        this.leaveTypes = [
            new leave_type_1.LeaveType(""),
            new leave_type_1.LeaveType("Absent")
        ];
        this.sessions = [
            new session_1.Session("Morning", 0),
            new session_1.Session("Afternoon", 1)
        ];
    }
    AttendanceComponent.prototype.ngOnInit = function () {
        this.getClasses();
        this.selectedClass = new clas_1.Clas(0, "");
        this.selectedSection = new section_1.Section(0, "");
    };
    AttendanceComponent.prototype.getClasses = function () {
        var _this = this;
        this.classService
            .getClasses()
            .then(function (classes) { return _this.classes = classes; })
            .catch(function (error) { return _this.error = error; });
    };
    AttendanceComponent.prototype.classSelected = function (classId) {
        for (var i = 0; i < this.classes.length; i++) {
            if (this.classes[i].id == classId) {
                this.selectedClass = this.classes[i];
            }
        }
        this.timetables = [];
        this.periods = [];
        this.getSections(this.selectedClass.id);
        this.cookieService.put("classId", "" + this.selectedClass.id);
        this.cookieService.put("className", this.selectedClass.className);
        this.selectingSection = false;
        this.markedAttendances = null;
        this.unmarkedAttendances = null;
    };
    AttendanceComponent.prototype.getSections = function (id) {
        var _this = this;
        this.sectionService
            .getSections(id)
            .then(function (sections) { return _this.sections = sections; })
            .catch(function (error) { return _this.error = error; });
    };
    AttendanceComponent.prototype.sectionSelected = function (sectionId) {
        for (var i = 0; i < this.sections.length; i++) {
            if (this.sections[i].id == sectionId) {
                this.selectedSection = this.sections[i];
            }
        }
        this.timetables = [];
        this.periods = [];
        this.cookieService.put("sectionId", "" + this.selectedSection.id);
        this.cookieService.put("sectionName", this.selectedSection.sectionName);
        this.getTimetable(this.selectedSection.id);
        this.selectingSection = true;
        this.markedAttendances = null;
        this.unmarkedAttendances = null;
    };
    AttendanceComponent.prototype.getTimetable = function (sectionId) {
        var _this = this;
        this.timetableService
            .getTimetables(sectionId)
            .then(function (timetables) {
            _this.timetables = timetables;
            _this.getPeriods();
        })
            .catch(function (error) { return _this.error = error; });
    };
    AttendanceComponent.prototype.getPeriods = function () {
        for (var _i = 0, _a = this.timetables; _i < _a.length; _i++) {
            var timetable = _a[_i];
            this.periods.push(timetable.periodNo);
        }
    };
    AttendanceComponent.prototype.fetchAttendance = function () {
        this.markedAttendances = [];
        this.unmarkedAttendances = [];
        this.getMarkedAttendance(this.selectedSection.id, this.dateAttendance);
        this.getUnmarkedAttendance(this.selectedSection.id, this.dateAttendance);
    };
    AttendanceComponent.prototype.fetchSessionAttendance = function () {
        this.markedAttendances = [];
        this.unmarkedAttendances = [];
        this.getMarkedSessionAttendance(this.session, this.selectedSection.id, this.dateAttendance);
        this.getUnmarkedSessionAttendance(this.session, this.selectedSection.id, this.dateAttendance);
    };
    AttendanceComponent.prototype.delete = function (attendance, event) {
        var _this = this;
        event.stopPropagation();
        this.attendanceService
            .delete(attendance)
            .then(function () {
            if (_this.selectedClass.attendanceType == 'Daily') {
                _this.fetchAttendance();
            }
            else if (_this.selectedClass.attendanceType == 'Session') {
                _this.fetchSessionAttendance();
            }
            else if (_this.selectedClass.attendanceType == 'Period') {
                _this.fetchSessionAttendance();
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    AttendanceComponent.prototype.prepareMarkedAttendance = function () {
        for (var _i = 0, _a = this.unmarkedAttendances; _i < _a.length; _i++) {
            var att = _a[_i];
            if (att.typeOfLeave == 'Absent') {
                this.preparedAttendances.push(att);
            }
        }
    };
    AttendanceComponent.prototype.save = function () {
        var _this = this;
        event.stopPropagation();
        this.preparedAttendances = [];
        this.prepareMarkedAttendance();
        this.attendanceService
            .post(this.preparedAttendances)
            .then(function () {
            if (_this.selectedClass.attendanceType == 'Daily') {
                _this.fetchAttendance();
            }
            else if (_this.selectedClass.attendanceType == 'Session') {
                _this.fetchSessionAttendance();
            }
            else if (_this.selectedClass.attendanceType == 'Period') {
                _this.fetchSessionAttendance();
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    AttendanceComponent.prototype.getMarkedAttendance = function (sectionId, date) {
        var _this = this;
        this.attendanceService
            .dailyAttendanceMarked(sectionId, date)
            .then(function (attendances) {
            _this.markedAttendances = attendances;
        })
            .catch(function (error) { return _this.error = error; });
    };
    AttendanceComponent.prototype.getUnmarkedAttendance = function (sectionId, date) {
        var _this = this;
        this.attendanceService
            .dailyAttendanceUnmarked(sectionId, date)
            .then(function (attendances) {
            _this.unmarkedAttendances = attendances;
        })
            .catch(function (error) { return _this.error = error; });
    };
    AttendanceComponent.prototype.getMarkedSessionAttendance = function (session, sectionId, date) {
        var _this = this;
        this.attendanceService
            .sessionAttendanceMarked(session, sectionId, date)
            .then(function (attendances) {
            _this.markedAttendances = attendances;
        })
            .catch(function (error) { return _this.error = error; });
    };
    AttendanceComponent.prototype.getUnmarkedSessionAttendance = function (session, sectionId, date) {
        var _this = this;
        this.attendanceService
            .sessionAttendanceUnmarked(session, sectionId, date)
            .then(function (attendances) {
            _this.unmarkedAttendances = attendances;
        })
            .catch(function (error) { return _this.error = error; });
    };
    AttendanceComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-attendance',
            templateUrl: 'attendance.component.html',
            styleUrls: ['attendance.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_2.CookieService, class_service_1.ClassService, section_service_1.SectionService, timetable_service_1.TimetableService, attendance_service_1.AttendanceService])
    ], AttendanceComponent);
    return AttendanceComponent;
}());
exports.AttendanceComponent = AttendanceComponent;
//# sourceMappingURL=attendance.component.js.map