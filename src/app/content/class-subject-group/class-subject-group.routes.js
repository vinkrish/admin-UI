"use strict";
var class_subject_group_component_1 = require('./class-subject-group.component');
var logged_in_guard_1 = require('../../login/logged-in.guard');
exports.clasSubjectGroupRoutes = [
    {
        path: 'class-subject-group',
        component: class_subject_group_component_1.ClassSubjectGroupComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    }
];
//# sourceMappingURL=class-subject-group.routes.js.map