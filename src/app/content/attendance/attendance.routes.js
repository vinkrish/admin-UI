"use strict";
var attendance_component_1 = require('./attendance.component');
var logged_in_guard_1 = require('../../login/logged-in.guard');
exports.attendanceRoutes = [
    {
        path: 'attendance',
        component: attendance_component_1.AttendanceComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    }
];
//# sourceMappingURL=attendance.routes.js.map