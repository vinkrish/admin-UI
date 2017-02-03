"use strict";
var cce_topic_primary_component_1 = require('./cce-topic-primary.component');
var cce_topic_primary_edit_component_1 = require('./cce-topic-primary-edit.component');
var logged_in_guard_1 = require('../../login/logged-in.guard');
exports.topicPrimaryRoutes = [
    {
        path: 'cce-topic-primary',
        component: cce_topic_primary_component_1.TopicPrimaryComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    },
    {
        path: 'cce-topic-primary/edit/:id',
        component: cce_topic_primary_edit_component_1.TopicPrimaryEditComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard]
    }
];
//# sourceMappingURL=cce-topic-primary.routes.js.map