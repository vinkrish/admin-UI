"use strict";
var subject_student_component_1 = require('./subject-student.component');
var logged_in_guard_1 = require('../../login/logged-in.guard');
exports.subjectStudentRoutes = [
    {
        path: 'subject-student',
        component: subject_student_component_1.SubjectStudentComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    }
];
//# sourceMappingURL=subject-student.routes.js.map