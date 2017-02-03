"use strict";
var cce_coscholastic_class_component_1 = require('./cce-coscholastic-class.component');
var logged_in_guard_1 = require('../../login/logged-in.guard');
exports.cceCoschClassRoutes = [
    {
        path: 'cce-coscholastic-class',
        component: cce_coscholastic_class_component_1.CceCoschClassComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    }
];
//# sourceMappingURL=cce-coscholastic-class.routes.js.map