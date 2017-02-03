"use strict";
var cce_coscholastic_component_1 = require('./cce-coscholastic.component');
var cce_coscholastic_edit_component_1 = require('./cce-coscholastic-edit.component');
var logged_in_guard_1 = require('../../login/logged-in.guard');
exports.cceCoscholasticRoutes = [
    {
        path: 'cce-coscholastic',
        component: cce_coscholastic_component_1.CceCoschComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    },
    {
        path: 'cce-coscholastic/edit/:id',
        component: cce_coscholastic_edit_component_1.CceCoschEditComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    }
];
//# sourceMappingURL=cce-coscholastic.routes.js.map