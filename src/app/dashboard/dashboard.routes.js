"use strict";
var attendance_routes_1 = require('../content/attendance/attendance.routes');
var clas_routes_1 = require('../content/class/clas.routes');
var class_subject_group_routes_1 = require('../content/class-subject-group/class-subject-group.routes');
var homework_routes_1 = require('../content/homework/homework.routes');
var section_routes_1 = require('../content/section/section.routes');
var student_routes_1 = require('../content/student/student.routes');
var subject_group_routes_1 = require('../content/subject-group/subject-group.routes');
var subject_group_subject_routes_1 = require('../content/subject-group-subject/subject-group-subject.routes');
var subject_teacher_routes_1 = require('../content/subject-teacher/subject-teacher.routes');
var subject_student_routes_1 = require('../content/subject-student/subject-student.routes');
var subjects_routes_1 = require('../content/subjects/subjects.routes');
var teacher_routes_1 = require('../content/teacher/teacher.routes');
var timetable_routes_1 = require('../content/timetable/timetable.routes');
exports.dashboardRoutes = clas_routes_1.clasRoutes.concat(class_subject_group_routes_1.clasSubjectGroupRoutes, homework_routes_1.homeworkRoutes, section_routes_1.sectionRoutes, student_routes_1.studentRoutes, subject_group_routes_1.subjectGroupRoutes, subject_group_subject_routes_1.subjectGroupSubjectRoutes, subject_teacher_routes_1.subjectTeacherRoutes, subject_student_routes_1.subjectStudentRoutes, subjects_routes_1.subjectsRoutes, teacher_routes_1.teacherRoutes, attendance_routes_1.attendanceRoutes, timetable_routes_1.timetableRoutes);
//# sourceMappingURL=dashboard.routes.js.map