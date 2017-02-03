"use strict";
var timetable_component_1 = require('./timetable.component');
var logged_in_guard_1 = require('../../login/logged-in.guard');
exports.timetableRoutes = [
    {
        path: 'timetable',
        component: timetable_component_1.TimetableComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    }
];
//# sourceMappingURL=timetable.routes.js.map