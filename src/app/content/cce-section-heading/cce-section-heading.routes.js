"use strict";
var cce_section_heading_component_1 = require('./cce-section-heading.component');
var cce_section_heading_edit_component_1 = require('./cce-section-heading-edit.component');
var logged_in_guard_1 = require('../../login/logged-in.guard');
exports.sectionHeadingRoutes = [
    {
        path: 'cce-section-heading',
        component: cce_section_heading_component_1.SectionHeadingComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    },
    {
        path: 'cce-section-heading/edit/:id',
        component: cce_section_heading_edit_component_1.SectionHeadingEditComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    }
];
//# sourceMappingURL=cce-section-heading.routes.js.map