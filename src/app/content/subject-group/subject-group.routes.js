"use strict";
var subject_group_component_1 = require('./subject-group.component');
var subject_group_edit_component_1 = require('./subject-group-edit.component');
var logged_in_guard_1 = require('../../login/logged-in.guard');
exports.subjectGroupRoutes = [
    {
        path: 'subject-group',
        component: subject_group_component_1.SubjectGroupComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    },
    {
        path: 'subject-group/edit/:id',
        component: subject_group_edit_component_1.SubjectGroupEditComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    }
];
//# sourceMappingURL=subject-group.routes.js.map