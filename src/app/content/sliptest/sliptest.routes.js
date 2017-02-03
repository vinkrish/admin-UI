"use strict";
var sliptest_component_1 = require('./sliptest.component');
var sliptest_edit_component_1 = require('./sliptest-edit.component');
var logged_in_guard_1 = require('../../login/logged-in.guard');
exports.sliptestRoutes = [
    {
        path: 'sliptest',
        component: sliptest_component_1.SliptestComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    },
    {
        path: 'sliptest/edit/:id',
        component: sliptest_edit_component_1.SliptestEditComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    }
];
//# sourceMappingURL=sliptest.routes.js.map