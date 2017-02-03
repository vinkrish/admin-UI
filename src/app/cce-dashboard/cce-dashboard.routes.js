"use strict";
var logged_in_guard_1 = require('../login/logged-in.guard');
var cce_student_profile_component_1 = require('../content/cce-student-profile/cce-student-profile.component');
var cce_coscholastic_routes_1 = require('../content/cce-coscholastic/cce-coscholastic.routes');
var cce_coscholastic_class_routes_1 = require('../content/cce-coscholastic-class/cce-coscholastic-class.routes');
var cce_section_heading_routes_1 = require('../content/cce-section-heading/cce-section-heading.routes');
var cce_topic_primary_routes_1 = require('../content/cce-topic-primary/cce-topic-primary.routes');
var cce_aspect_primary_component_1 = require('../content/cce-aspect-primary/cce-aspect-primary.component');
var cce_topic_grade_component_1 = require('../content/cce-topic-grade/cce-topic-grade.component');
var cce_aspect_grade_component_1 = require('../content/cce-aspect-grade/cce-aspect-grade.component');
exports.cceDashboardRoutes = [
    {
        path: 'cce-student-profile',
        component: cce_student_profile_component_1.CceStudentProfileComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    }
].concat(cce_coscholastic_routes_1.cceCoscholasticRoutes, cce_coscholastic_class_routes_1.cceCoschClassRoutes, cce_section_heading_routes_1.sectionHeadingRoutes, cce_topic_primary_routes_1.topicPrimaryRoutes, [
    {
        path: 'cce-aspect-primary',
        component: cce_aspect_primary_component_1.AspectPrimaryComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    },
    {
        path: 'cce-topic-grade',
        component: cce_topic_grade_component_1.TopicGradeComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    },
    {
        path: 'cce-aspect-grade',
        component: cce_aspect_grade_component_1.AspectGradeComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    }
]);
//# sourceMappingURL=cce-dashboard.routes.js.map