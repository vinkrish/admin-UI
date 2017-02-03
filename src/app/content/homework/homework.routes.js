"use strict";
var homework_component_1 = require('./homework.component');
var logged_in_guard_1 = require('../../login/logged-in.guard');
exports.homeworkRoutes = [
    {
        path: 'homework',
        component: homework_component_1.HomeworkComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    }
];
//# sourceMappingURL=homework.routes.js.map