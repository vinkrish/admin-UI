"use strict";
var subject_teacher_component_1 = require('./subject-teacher.component');
var subject_teacher_edit_component_1 = require('./subject-teacher-edit.component');
var logged_in_guard_1 = require('../../login/logged-in.guard');
exports.subjectTeacherRoutes = [
    {
        path: 'subject-teacher',
        component: subject_teacher_component_1.SubjectTeacherComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    },
    {
        path: 'subject-teacher/edit/:id',
        component: subject_teacher_edit_component_1.SubjectTeacherEditComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    }
];
//# sourceMappingURL=subject-teacher.routes.js.map