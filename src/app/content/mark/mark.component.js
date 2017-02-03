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
var class_service_1 = require('../class/class.service');
var section_service_1 = require('../section/section.service');
var student_service_1 = require('../student/student.service');
var subject_student_service_1 = require('../subject-student/subject-student.service');
var exam_1 = require('../exam/exam');
var exam_service_1 = require('../exam/exam.service');
var exam_subject_1 = require('../exam-subject/exam-subject');
var exam_subject_service_1 = require('../exam-subject/exam-subject.service');
var mark_1 = require('./mark');
var mark_service_1 = require('./mark.service');
var core_2 = require('angular2-cookie/core');
var MarkComponent = (function () {
    function MarkComponent(router, cookieService, classService, sectionService, studentService, examService, examSubjectService, ssService, markService) {
        this.router = router;
        this.cookieService = cookieService;
        this.classService = classService;
        this.sectionService = sectionService;
        this.studentService = studentService;
        this.examService = examService;
        this.examSubjectService = examSubjectService;
        this.ssService = ssService;
        this.markService = markService;
    }
    MarkComponent.prototype.ngOnInit = function () {
        this.getClasses();
        this.selectedClass = new clas_1.Clas(0, "");
        this.clearValues();
    };
    MarkComponent.prototype.getClasses = function () {
        var _this = this;
        this.classService
            .getClasses()
            .then(function (classes) { return _this.classes = classes; })
            .catch(function (error) { return _this.error = error; });
    };
    MarkComponent.prototype.classSelected = function (classId) {
        for (var i = 0; i < this.classes.length; i++) {
            if (this.classes[i].id == classId) {
                this.selectedClass = this.classes[i];
            }
        }
        this.clearValues();
        this.getSections(this.selectedClass.id);
        this.getExams(this.selectedClass.id);
    };
    MarkComponent.prototype.getSections = function (id) {
        var _this = this;
        this.sectionService
            .getSections(id)
            .then(function (sections) { return _this.sections = sections; })
            .catch(function (error) { return _this.error = error; });
    };
    MarkComponent.prototype.sectionSelected = function (sectionId) {
        for (var i = 0; i < this.sections.length; i++) {
            if (this.sections[i].id == sectionId) {
                this.selectedSection = this.sections[i];
            }
        }
        this.selectedExam = new exam_1.Exam();
        this.selectedExamSubject = new exam_subject_1.ExamSubject();
        this.examStudents = [];
        this.marks = [];
        this.students = [];
        this.existingMarks = [];
        this.getStudents(this.selectedSection.id);
    };
    MarkComponent.prototype.getStudents = function (id) {
        var _this = this;
        this.studentService
            .getStudents(id)
            .then(function (students) {
            _this.students = students;
        })
            .catch(function (error) { return _this.error = error; });
    };
    MarkComponent.prototype.getExams = function (id) {
        var _this = this;
        this.examService
            .getExams(id)
            .then(function (exams) { return _this.exams = exams; })
            .catch(function (error) { return _this.error = error; });
    };
    MarkComponent.prototype.examSelected = function (examId) {
        this.examSubjects = null;
        for (var i = 0; i < this.exams.length; i++) {
            if (this.exams[i].id == examId) {
                this.selectedExam = this.exams[i];
            }
        }
        this.selectedExamSubject = new exam_subject_1.ExamSubject();
        this.examStudents = [];
        this.marks = [];
        this.existingMarks = [];
        this.getExamSubjects(this.selectedExam.id);
    };
    MarkComponent.prototype.getExamSubjects = function (id) {
        var _this = this;
        this.examSubjectService
            .getExamSubjects(id)
            .then(function (examSubjects) { return _this.examSubjects = examSubjects; })
            .catch(function (error) { return _this.error = error; });
    };
    MarkComponent.prototype.examSubjectSelected = function (subjectId) {
        for (var i = 0; i < this.examSubjects.length; i++) {
            if (this.examSubjects[i].subjectId == subjectId) {
                this.selectedExamSubject = this.examSubjects[i];
            }
        }
        this.marks = [];
        this.existingMarks = [];
        this.examStudents = [];
        this.getSubjectStudents();
    };
    MarkComponent.prototype.getSubjectStudents = function () {
        var _this = this;
        this.ssService
            .getSubjectStudent(this.selectedSection.id, this.selectedExamSubject.subjectId)
            .then(function (subjectStudent) {
            _this.subjectStudent = subjectStudent;
            _this.initExamStudents();
        })
            .catch(function (error) { return _this.error = error; });
    };
    MarkComponent.prototype.initExamStudents = function () {
        if (typeof this.subjectStudent.studentIds != 'undefined') {
            var intIds = this.subjectStudent.studentIds.split(",").map(Number).filter(Boolean);
            for (var _i = 0, intIds_1 = intIds; _i < intIds_1.length; _i++) {
                var ids = intIds_1[_i];
                for (var i = 0; i < this.students.length; i++) {
                    if (this.students[i].id == ids) {
                        this.examStudents.push(this.students[i]);
                        this.initMarks(i);
                    }
                }
            }
            this.getMarks();
        }
    };
    MarkComponent.prototype.getMarks = function () {
        var _this = this;
        this.markService
            .getMarks(this.selectedExam.id, this.selectedExamSubject.subjectId, this.selectedSection.id)
            .then(function (existingMarks) {
            _this.existingMarks = existingMarks;
            if (_this.existingMarks.length == 0) {
                _this.isMarksPresent = false;
            }
            else {
                _this.isMarksPresent = true;
                _this.exportMarks();
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    MarkComponent.prototype.initMarks = function (index) {
        var marc = new mark_1.Mark();
        marc.examId = this.selectedExam.id;
        marc.subjectId = this.selectedExamSubject.subjectId;
        marc.sectionId = this.selectedSection.id;
        marc.studentId = this.students[index].id;
        marc.grade = '';
        this.marks.push(marc);
    };
    MarkComponent.prototype.exportMarks = function () {
        for (var i = 0; i < this.marks.length; i++) {
            for (var j = 0; j < this.existingMarks.length; j++) {
                if (this.existingMarks[j].studentId == this.marks[i].studentId) {
                    this.marks[i].id = this.existingMarks[j].id;
                    this.marks[i].mark = this.existingMarks[j].mark;
                    this.marks[i].grade = this.existingMarks[j].grade;
                }
            }
        }
    };
    MarkComponent.prototype.defaultMarks = function () {
        for (var i = 0; i < this.marks.length; i++) {
            if (typeof this.marks[i].mark == 'undefined') {
                this.marks[i].mark = 0;
            }
        }
    };
    MarkComponent.prototype.clearValues = function () {
        this.selectedSection = new section_1.Section(0, "");
        this.selectedExam = new exam_1.Exam();
        this.selectedExamSubject = new exam_subject_1.ExamSubject();
        this.exams = [];
        this.examStudents = [];
        this.examSubjects = [];
        this.marks = [];
        this.students = [];
        this.existingMarks = [];
    };
    MarkComponent.prototype.save = function () {
        var _this = this;
        this.defaultMarks();
        if (this.isMarksPresent) {
            this.markService
                .put(this.marks)
                .then()
                .catch(function (error) { return _this.error = error; });
        }
        else {
            this.markService
                .post(this.marks)
                .then()
                .catch(function (error) { return _this.error = error; });
        }
    };
    MarkComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-mark',
            templateUrl: 'mark.component.html',
            styleUrls: ['mark.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_2.CookieService, class_service_1.ClassService, section_service_1.SectionService, student_service_1.StudentService, exam_service_1.ExamService, exam_subject_service_1.ExamSubjectService, subject_student_service_1.SubjectStudentService, mark_service_1.MarkService])
    ], MarkComponent);
    return MarkComponent;
}());
exports.MarkComponent = MarkComponent;
//# sourceMappingURL=mark.component.js.map