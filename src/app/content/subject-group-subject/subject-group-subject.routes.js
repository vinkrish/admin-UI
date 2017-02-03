"use strict";
var subject_group_subject_component_1 = require('./subject-group-subject.component');
var logged_in_guard_1 = require('../../login/logged-in.guard');
exports.subjectGroupSubjectRoutes = [
    {
        path: 'subject-group-subject',
        component: subject_group_subject_component_1.SubjectGroupSubjectComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    }
];
//# sourceMappingURL=subject-group-subject.routes.js.map