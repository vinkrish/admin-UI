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
var cce_coscholastic_1 = require('../cce-coscholastic/cce-coscholastic');
var cce_section_heading_1 = require('../cce-section-heading/cce-section-heading');
var cce_topic_primary_1 = require('../cce-topic-primary/cce-topic-primary');
var cce_aspect_primary_1 = require('../cce-aspect-primary/cce-aspect-primary');
var cce_coscholastic_service_1 = require('../cce-coscholastic/cce-coscholastic.service');
var cce_section_heading_service_1 = require('../cce-section-heading/cce-section-heading.service');
var cce_topic_primary_service_1 = require('../cce-topic-primary/cce-topic-primary.service');
var cce_aspect_primary_service_1 = require('../cce-aspect-primary/cce-aspect-primary.service');
var cce_aspect_grade_1 = require('./cce-aspect-grade');
var cce_aspect_grade_service_1 = require('./cce-aspect-grade.service');
var AspectGradeComponent = (function () {
    function AspectGradeComponent(router, classService, sectionService, studentService, coschService, sectionHeadingService, topicPrimaryService, aspectPrimaryService, aspectGradeService) {
        this.router = router;
        this.classService = classService;
        this.sectionService = sectionService;
        this.studentService = studentService;
        this.coschService = coschService;
        this.sectionHeadingService = sectionHeadingService;
        this.topicPrimaryService = topicPrimaryService;
        this.aspectPrimaryService = aspectPrimaryService;
        this.aspectGradeService = aspectGradeService;
    }
    AspectGradeComponent.prototype.ngOnInit = function () {
        this.getClasses();
        this.selectedClass = new clas_1.Clas();
        this.getCoscholastics();
        this.clearValues();
    };
    AspectGradeComponent.prototype.clearValues = function () {
        this.selectedSection = new section_1.Section();
        this.students = [];
        this.grades = [];
        this.existingGrades = [];
        this.selectedCosch = new cce_coscholastic_1.CceCoscholastic();
        this.selectedSectionHeading = new cce_section_heading_1.CceSectionHeading();
        this.selectedTopicPrimary = new cce_topic_primary_1.CceTopicPrimary();
        this.selectedAspect = new cce_aspect_primary_1.CceAspectPrimary();
    };
    AspectGradeComponent.prototype.getClasses = function () {
        var _this = this;
        this.classService
            .getClasses()
            .then(function (classes) { return _this.classes = classes; })
            .catch(function (error) { return _this.error = error; });
    };
    AspectGradeComponent.prototype.classSelected = function (classId) {
        for (var i = 0; i < this.classes.length; i++) {
            if (this.classes[i].id == classId) {
                this.selectedClass = this.classes[i];
            }
        }
        this.clearValues();
        this.getSections(this.selectedClass.id);
    };
    AspectGradeComponent.prototype.getSections = function (id) {
        var _this = this;
        this.sectionService
            .getSections(id)
            .then(function (sections) { return _this.sections = sections; })
            .catch(function (error) { return _this.error = error; });
    };
    AspectGradeComponent.prototype.sectionSelected = function (sectionId) {
        for (var i = 0; i < this.sections.length; i++) {
            if (this.sections[i].id == sectionId) {
                this.selectedSection = this.sections[i];
            }
        }
        this.students = [];
        this.grades = [];
        this.existingGrades = [];
        //this.getStudents(this.selectedSection.id);
    };
    AspectGradeComponent.prototype.getStudents = function (id) {
        var _this = this;
        this.studentService
            .getStudents(id)
            .then(function (students) {
            _this.students = students;
            _this.initGrades();
        })
            .catch(function (error) { return _this.error = error; });
    };
    AspectGradeComponent.prototype.getCoscholastics = function () {
        var _this = this;
        this.coschService
            .getCceCoscholastics()
            .then(function (coscholastics) { return _this.coscholastics = coscholastics; })
            .catch(function (error) { return _this.error = error; });
    };
    AspectGradeComponent.prototype.coschSelected = function (coscholasticId) {
        for (var i = 0; i < this.coscholastics.length; i++) {
            if (this.coscholastics[i].id == coscholasticId) {
                this.selectedCosch = this.coscholastics[i];
            }
        }
        this.aspects = null;
        this.getSectionHeadings(this.selectedCosch.id);
        this.selectedSectionHeading = new cce_section_heading_1.CceSectionHeading();
        this.selectedTopicPrimary = new cce_topic_primary_1.CceTopicPrimary();
        this.topicPrimarys = null;
    };
    AspectGradeComponent.prototype.getSectionHeadings = function (coscholasticId) {
        var _this = this;
        this.sectionHeadingService
            .getSectionHeadings(coscholasticId)
            .then(function (sectionHeadings) { return _this.sectionHeadings = sectionHeadings; })
            .catch(function (error) { return _this.error = error; });
    };
    AspectGradeComponent.prototype.sectionHeadingSelected = function (sectionHeadingId) {
        for (var i = 0; i < this.sectionHeadings.length; i++) {
            if (this.sectionHeadings[i].id == sectionHeadingId) {
                this.selectedSectionHeading = this.sectionHeadings[i];
            }
        }
        this.aspects = null;
        this.selectedTopicPrimary = new cce_topic_primary_1.CceTopicPrimary();
        this.getTopicPrimarys(this.selectedSectionHeading.id);
    };
    AspectGradeComponent.prototype.getTopicPrimarys = function (id) {
        var _this = this;
        this.topicPrimaryService
            .getTopicPrimarys(id)
            .then(function (topicPrimarys) { return _this.topicPrimarys = topicPrimarys; })
            .catch(function (error) { return _this.error = error; });
    };
    AspectGradeComponent.prototype.topicSelected = function (topicId) {
        for (var i = 0; i < this.topicPrimarys.length; i++) {
            if (this.topicPrimarys[i].id == topicId) {
                this.selectedTopicPrimary = this.topicPrimarys[i];
            }
        }
        this.aspects = null;
        this.getAspects(this.selectedTopicPrimary.id);
    };
    AspectGradeComponent.prototype.getAspects = function (id) {
        var _this = this;
        this.aspectPrimaryService
            .getAspectPrimarys(id)
            .then(function (aspectPrimarys) { return _this.aspects = aspectPrimarys; })
            .catch(function (error) { return _this.error = error; });
    };
    AspectGradeComponent.prototype.aspectSelected = function (aspectId) {
        for (var i = 0; i < this.aspects.length; i++) {
            if (this.aspects[i].id == aspectId) {
                this.selectedAspect = this.aspects[i];
            }
        }
    };
    AspectGradeComponent.prototype.getGrades = function () {
        this.getStudents(this.selectedSection.id);
    };
    AspectGradeComponent.prototype.initGrades = function () {
        var _this = this;
        for (var i = 0; i < this.students.length; i++) {
            var grad = new cce_aspect_grade_1.CceAspectGrade();
            grad.sectionId = this.selectedSection.id;
            grad.studentId = this.students[i].id;
            grad.aspectId = this.selectedAspect.id;
            grad.term = this.term;
            grad.grade = '';
            this.grades.push(grad);
        }
        this.aspectGradeService
            .getGrades(this.selectedAspect.id, this.selectedSection.id, this.term)
            .then(function (existingGrades) {
            _this.existingGrades = existingGrades;
            if (_this.existingGrades.length == 0) {
                _this.isGradePresent = false;
            }
            else {
                _this.isGradePresent = true;
                _this.exportGrades();
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    AspectGradeComponent.prototype.exportGrades = function () {
        for (var i = 0; i < this.grades.length; i++) {
            for (var j = 0; j < this.existingGrades.length; j++) {
                if (this.existingGrades[j].studentId == this.grades[i].studentId) {
                    this.grades[i].id = this.existingGrades[j].id;
                    this.grades[i].grade = this.existingGrades[j].grade;
                    this.grades[i].description = this.existingGrades[i].description;
                }
            }
        }
    };
    AspectGradeComponent.prototype.save = function () {
        var _this = this;
        this.defaultGrades();
        if (this.isGradePresent) {
            this.aspectGradeService
                .put(this.grades)
                .then()
                .catch(function (error) { return _this.error = error; });
        }
        else {
            this.aspectGradeService
                .post(this.grades)
                .then()
                .catch(function (error) { return _this.error = error; });
        }
    };
    AspectGradeComponent.prototype.defaultGrades = function () {
        for (var i = 0; i < this.grades.length; i++) {
            if (typeof this.grades[i].grade == 'undefined') {
                this.grades[i].grade = "";
            }
            if (typeof this.grades[i].description == 'undefined') {
                this.grades[i].description = "";
            }
        }
    };
    AspectGradeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-cce-aspect-grade',
            templateUrl: 'cce-aspect-grade.component.html',
            styleUrls: ['cce-aspect-grade.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, class_service_1.ClassService, section_service_1.SectionService, student_service_1.StudentService, cce_coscholastic_service_1.CceCoscholasticService, cce_section_heading_service_1.SectionHeadingService, cce_topic_primary_service_1.TopicPrimaryService, cce_aspect_primary_service_1.AspectPrimaryService, cce_aspect_grade_service_1.AspectGradeService])
    ], AspectGradeComponent);
    return AspectGradeComponent;
}());
exports.AspectGradeComponent = AspectGradeComponent;
//# sourceMappingURL=cce-aspect-grade.component.js.map