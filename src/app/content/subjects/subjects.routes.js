"use strict";
var subjects_component_1 = require('./subjects.component');
var subjects_edit_component_1 = require('./subjects-edit.component');
var logged_in_guard_1 = require('../../login/logged-in.guard');
exports.subjectsRoutes = [
    {
        path: 'subjects',
        component: subjects_component_1.SubjectsComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    },
    {
        path: 'subject/edit/:id',
        component: subjects_edit_component_1.SubjectsEditComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    }
];
//# sourceMappingURL=subjects.routes.js.map