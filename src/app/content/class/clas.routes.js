"use strict";
var class_component_1 = require('./class.component');
var class_edit_component_1 = require('./class-edit.component');
var logged_in_guard_1 = require('../../login/logged-in.guard');
exports.clasRoutes = [
    {
        path: 'class',
        component: class_component_1.ClassComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    },
    {
        path: 'class/edit/:id',
        component: class_edit_component_1.ClassEditComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    }
];
//# sourceMappingURL=clas.routes.js.map