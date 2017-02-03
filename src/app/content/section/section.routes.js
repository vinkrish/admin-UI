"use strict";
var section_component_1 = require('./section.component');
var section_edit_component_1 = require('./section-edit.component');
var logged_in_guard_1 = require('../../login/logged-in.guard');
exports.sectionRoutes = [
    {
        path: 'section',
        component: section_component_1.SectionComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    },
    {
        path: 'section/edit/:id',
        component: section_edit_component_1.SectionEditComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    }
];
//# sourceMappingURL=section.routes.js.map