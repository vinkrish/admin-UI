import { AppComponent }   			from './app.component';
import { HeaderComponent }			from '../app/shared/header/header.component';
import { LoginComponent }			from './login/credentials.component';
import { DashboardComponent }       from './dashboard/dashboard.component';
import { ExamDashboardComponent }   from './exam-dashboard/exam-dashboard.component';
import { CceDashboardComponent }   	from './cce-dashboard/cce-dashboard.component';
import { AttendanceComponent }		from '../app/content/attendance/attendance.component';
import { ClassComponent }			from '../app/content/class/class.component';
import { ClassEditComponent }		from '../app/content/class/class-edit.component';
import { ClassSubjectGroupComponent }		from '../app/content/class-subject-group/class-subject-group.component';
import { ClassSubjectGroupEditComponent } 	from '../app/content/class-subject-group/class-subject-group-edit.component';
import { ExamComponent }        		from '../app/content/exam/exam.component';
import { ExamEditComponent }        	from '../app/content/exam/exam-edit.component';
import { ExamSubjectComponent }       	from '../app/content/exam-subject/exam-subject.component';
import { ExamSubjectGroupComponent }  	from '../app/content/exam-subject-group/exam-subject-group.component';
import { ActivityComponent }          	from '../app/content/activity/activity.component';
import { SubActivityComponent }         from '../app/content/subactivity/subactivity.component';
import { HomeworkComponent }          	from '../app/content/homework/homework.component';
import { SectionComponent }           	from '../app/content/section/section.component';
import { SectionEditComponent }         from '../app/content/section/section-edit.component';
import { StudentComponent }        		from '../app/content/student/student.component';
import { StudentEditComponent }        	from '../app/content/student/student-edit.component';
import { SubjectGroupComponent }      	from '../app/content/subject-group/subject-group.component';
import { SubjectGroupEditComponent }    from '../app/content/subject-group/subject-group-edit.component';
import { SubjectGroupSubjectComponent}	from '../app/content/subject-group-subject/subject-group-subject.component';
import { SubjectGroupSubjectEditComponent}	from '../app/content/subject-group-subject/subject-group-subject-edit.component';
import { SubjectTeacherComponent }    	from '../app/content/subject-teacher/subject-teacher.component';
import { SubjectTeacherEditComponent }  from '../app/content/subject-teacher/subject-teacher-edit.component';
import { SubjectStudentComponent }    	from '../app/content/subject-student/subject-student.component';
import { SubjectsComponent }        	from '../app/content/subjects/subjects.component';
import { SubjectsEditComponent }        from '../app/content/subjects/subjects-edit.component';
import { TeacherComponent }        		from '../app/content/teacher/teacher.component';
import { TeacherEditComponent }        	from '../app/content/teacher/teacher-edit.component';
import { TimetableComponent }        	from '../app/content/timetable/timetable.component';
import { MarkComponent }        		from '../app/content/mark/mark.component';
import { ActivityScoreComponent }      	from '../app/content/activity-score/activity-score.component';
import { SubActivityScoreComponent }    from '../app/content/subactivity-score/subactivity-score.component';
import { PortionComponent }        		from '../app/content/portion/portion.component';
import { PortionEditComponent }         from '../app/content/portion/portion-edit.component';
import { SliptestComponent }        	from '../app/content/sliptest/sliptest.component';
import { SliptestEditComponent }        from '../app/content/sliptest/sliptest-edit.component';
import { SliptestScoreComponent }       from '../app/content/sliptest-score/sliptest-score.component';
import { GradeClassWiseComponent }      from '../app/content/grade-class-wise/grade-class-wise.component';
import { CceStudentProfileComponent }   from '../app/content/cce-student-profile/cce-student-profile.component';
import { CceCoschComponent }			from '../app/content/cce-coscholastic/cce-coscholastic.component';
import { CceCoschEditComponent }		from '../app/content/cce-coscholastic/cce-coscholastic-edit.component';
import { CceCoschClassComponent }		from '../app/content/cce-coscholastic-class/cce-coscholastic-class.component';
import { CceCoschClassEditComponent }	from '../app/content/cce-coscholastic-class/cce-coscholastic-class-edit.component';
import { SectionHeadingComponent }   	from '../app/content/cce-section-heading/cce-section-heading.component';
import { SectionHeadingEditComponent }	from '../app/content/cce-section-heading/cce-section-heading-edit.component';
import { TopicPrimaryComponent }   		from '../app/content/cce-topic-primary/cce-topic-primary.component';
import { TopicPrimaryEditComponent }	from '../app/content/cce-topic-primary/cce-topic-primary-edit.component';
import { AspectPrimaryComponent }   	from '../app/content/cce-aspect-primary/cce-aspect-primary.component';
import { TopicGradeComponent }          from '../app/content/cce-topic-grade/cce-topic-grade.component';
import { AspectGradeComponent }         from '../app/content/cce-aspect-grade/cce-aspect-grade.component';

import { CookieService }          	from 'angular2-cookie/core';
import { LoginService }				from './login/credentials.service';
import { LoggedInGuard }			from './login/logged-in.guard';
import { AttendanceService }        from '../app/content/attendance/attendance.service';
import { ClassService }             from '../app/content/class/class.service';
import { ClassSubjectGroupService } from '../app/content/class-subject-group/class-subject-group.service';
import { HomeworkService }          from '../app/content/homework/homework.service';
import { SectionService }           from '../app/content/section/section.service';
import { StudentService }        	from '../app/content/student/student.service';
import { SubjectGroupService }      from '../app/content/subject-group/subject-group.service';
import { SubjectGroupSubjectService}from '../app/content/subject-group-subject/subject-group-subject.service';
import { SubjectTeacherService }    from '../app/content/subject-teacher/subject-teacher.service';
import { SubjectsService }        	from '../app/content/subjects/subjects.service';
import { TeacherService }        	from '../app/content/teacher/teacher.service';
import { TimetableService }        	from '../app/content/timetable/timetable.service';
import { ExamService }        		from '../app/content/exam/exam.service';
import { ExamSubjectGroupService }  from '../app/content/exam-subject-group/exam-subject-group.service';
import { ExamSubjectService }       from '../app/content/exam-subject/exam-subject.service';
import { ActivityService }     		from '../app/content/activity/activity.service';
import { SubActivityService }     	from '../app/content/subactivity/subactivity.service';
import { SubjectStudentService } 	from '../app/content/subject-student/subject-student.service';
import { MarkService }				from '../app/content/mark/mark.service';
import { ActivityScoreService }		from '../app/content/activity-score/activity-score.service';
import { SubActivityScoreService }	from '../app/content/subactivity-score/subactivity-score.service';
import { PortionService }			from '../app/content/portion/portion.service';
import { SliptestService }			from '../app/content/sliptest/sliptest.service';
import { SliptestScoreService }		from '../app/content/sliptest-score/sliptest-score.service';
import { GradeClassWiseService }	from '../app/content/grade-class-wise/grade-class-wise.service';
import { CceStudentProfileService } from '../app/content/cce-student-profile/cce-student-profile.service';
import { CceCoscholasticService }	from '../app/content/cce-coscholastic/cce-coscholastic.service';
import { CceCoschClassService }		from '../app/content/cce-coscholastic-class/cce-coscholastic-class.service';
import { SectionHeadingService }    from '../app/content/cce-section-heading/cce-section-heading.service';
import { TopicPrimaryService }    	from '../app/content/cce-topic-primary/cce-topic-primary.service';
import { AspectPrimaryService }    	from '../app/content/cce-aspect-primary/cce-aspect-primary.service';
import { TopicGradeService }    	from '../app/content/cce-topic-grade/cce-topic-grade.service';
import { AspectGradeService }    	from '../app/content/cce-aspect-grade/cce-aspect-grade.service';

export const myComponents = [
	AppComponent, 
	HeaderComponent,
	LoginComponent,
	DashboardComponent,
	ExamDashboardComponent,
	CceDashboardComponent,
	AttendanceComponent,
	ClassComponent,
	ClassEditComponent,
	ClassSubjectGroupComponent,
	ClassSubjectGroupEditComponent,
	ExamComponent,
	ExamEditComponent,
	ExamSubjectComponent,
	ExamSubjectGroupComponent,
	ActivityComponent,
	SubActivityComponent,
	HomeworkComponent,
	SectionComponent,
	SectionEditComponent,
	StudentComponent,
	StudentEditComponent,
	SubjectGroupComponent,
	SubjectGroupEditComponent,
	SubjectGroupSubjectComponent,
	SubjectGroupSubjectEditComponent,
	SubjectTeacherComponent,
	SubjectTeacherEditComponent,
	SubjectStudentComponent,
	SubjectsComponent,
	SubjectsEditComponent,
	TeacherComponent,
	TeacherEditComponent,
	TimetableComponent,
	MarkComponent,
	ActivityScoreComponent,
	SubActivityScoreComponent,
	PortionComponent,
	PortionEditComponent,
	SliptestComponent,
	SliptestEditComponent,
	SliptestScoreComponent,
	GradeClassWiseComponent,
	CceStudentProfileComponent,
	CceCoschComponent,
	CceCoschEditComponent,
	CceCoschClassComponent,
	CceCoschClassEditComponent,
	SectionHeadingComponent,
	SectionHeadingEditComponent,
	TopicPrimaryComponent,
	TopicPrimaryEditComponent,
	AspectPrimaryComponent,
	TopicGradeComponent,
	AspectGradeComponent
];

export const myServices = [
	CookieService,
	LoginService,
	LoggedInGuard,
    AttendanceService,
    ClassService,
    ClassSubjectGroupService,
    HomeworkService,
    SectionService,
    StudentService,
    SubjectGroupService,
    SubjectGroupSubjectService,
    SubjectTeacherService,
    SubjectsService,
    TeacherService,
    TimetableService,
    ExamService,
    ExamSubjectGroupService,
    ExamSubjectService,
    ActivityService,
    SubActivityService,
    SubjectStudentService,
    MarkService,
    ActivityScoreService,
    SubActivityScoreService,
    PortionService,
    SliptestService,
    SliptestScoreService,
    GradeClassWiseService,
    CceStudentProfileService,
    CceCoscholasticService,
    CceCoschClassService,
    SectionHeadingService,
    TopicPrimaryService,
    AspectPrimaryService,
    TopicGradeService,
    AspectGradeService
]