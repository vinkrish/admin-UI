"use strict";
var teacher_component_1 = require('./teacher.component');
var teacher_edit_component_1 = require('./teacher-edit.component');
var logged_in_guard_1 = require('../../login/logged-in.guard');
exports.teacherRoutes = [
    {
        path: 'teacher',
        component: teacher_component_1.TeacherComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    },
    {
        path: 'teacher/edit/:id',
        component: teacher_edit_component_1.TeacherEditComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    }
];
//# sourceMappingURL=teacher.routes.js.map