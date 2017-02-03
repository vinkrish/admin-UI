"use strict";
var portion_component_1 = require('./portion.component');
var portion_edit_component_1 = require('./portion-edit.component');
var logged_in_guard_1 = require('../../login/logged-in.guard');
exports.portionRoutes = [
    {
        path: 'portion',
        component: portion_component_1.PortionComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    },
    {
        path: 'portion/edit/:id',
        component: portion_edit_component_1.PortionEditComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    }
];
//# sourceMappingURL=portion.routes.js.map