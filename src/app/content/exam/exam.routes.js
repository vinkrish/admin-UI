"use strict";
var exam_component_1 = require('./exam.component');
var exam_edit_component_1 = require('./exam-edit.component');
var logged_in_guard_1 = require('../../login/logged-in.guard');
exports.examRoutes = [
    {
        path: 'exam',
        component: exam_component_1.ExamComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    },
    {
        path: 'exam/edit/:id',
        component: exam_edit_component_1.ExamEditComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    }
];
//# sourceMappingURL=exam.routes.js.map