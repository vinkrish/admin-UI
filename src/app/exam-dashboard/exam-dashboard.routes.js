"use strict";
var logged_in_guard_1 = require('../login/logged-in.guard');
var exam_routes_1 = require('../content/exam/exam.routes');
var exam_subject_component_1 = require('../content/exam-subject/exam-subject.component');
var exam_subject_group_component_1 = require('../content/exam-subject-group/exam-subject-group.component');
var mark_component_1 = require('../content/mark/mark.component');
var activity_component_1 = require('../content/activity/activity.component');
var activity_score_component_1 = require('../content/activity-score/activity-score.component');
var subactivity_component_1 = require('../content/subactivity/subactivity.component');
var subactivity_score_component_1 = require('../content/subactivity-score/subactivity-score.component');
var portion_routes_1 = require('../content/portion/portion.routes');
var sliptest_routes_1 = require('../content/sliptest/sliptest.routes');
var sliptest_score_component_1 = require('../content/sliptest-score/sliptest-score.component');
var grade_class_wise_component_1 = require('../content/grade-class-wise/grade-class-wise.component');
exports.examDashboardRoutes = exam_routes_1.examRoutes.concat([
    {
        path: 'exam-subject-group',
        component: exam_subject_group_component_1.ExamSubjectGroupComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    },
    {
        path: 'exam-subject',
        component: exam_subject_component_1.ExamSubjectComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    },
    {
        path: 'mark',
        component: mark_component_1.MarkComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    },
    {
        path: 'activity',
        component: activity_component_1.ActivityComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    },
    {
        path: 'activity-score',
        component: activity_score_component_1.ActivityScoreComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    },
    {
        path: 'subactivity',
        component: subactivity_component_1.SubActivityComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    },
    {
        path: 'subactivity-score',
        component: subactivity_score_component_1.SubActivityScoreComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    }
], portion_routes_1.portionRoutes, sliptest_routes_1.sliptestRoutes, [
    {
        path: 'sliptest-score',
        component: sliptest_score_component_1.SliptestScoreComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    },
    {
        path: 'grade-class-wise',
        component: grade_class_wise_component_1.GradeClassWiseComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    }
]);
//# sourceMappingURL=exam-dashboard.routes.js.map