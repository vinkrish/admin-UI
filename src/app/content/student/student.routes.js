"use strict";
var student_component_1 = require('./student.component');
var student_edit_component_1 = require('./student-edit.component');
var logged_in_guard_1 = require('../../login/logged-in.guard');
exports.studentRoutes = [
    {
        path: 'student',
        component: student_component_1.StudentComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    },
    {
        path: 'student/edit/:id',
        component: student_edit_component_1.StudentEditComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    }
];
//# sourceMappingURL=student.routes.js.map