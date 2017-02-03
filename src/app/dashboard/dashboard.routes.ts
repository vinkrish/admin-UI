import { Routes }                       from '@angular/router';
import { LoggedInGuard }                from '../login/logged-in.guard';
import { attendanceRoutes }             from '../content/attendance/attendance.routes'
import { clasRoutes }                   from '../content/class/clas.routes';
import { clasSubjectGroupRoutes }       from '../content/class-subject-group/class-subject-group.routes';
import { homeworkRoutes }               from '../content/homework/homework.routes';
import { sectionRoutes }                from '../content/section/section.routes';
import { studentRoutes }                from '../content/student/student.routes';
import { subjectGroupRoutes }           from '../content/subject-group/subject-group.routes'
import { subjectGroupSubjectRoutes }    from '../content/subject-group-subject/subject-group-subject.routes'
import { subjectTeacherRoutes }         from '../content/subject-teacher/subject-teacher.routes';
import { subjectStudentRoutes }         from '../content/subject-student/subject-student.routes';
import { subjectsRoutes }               from '../content/subjects/subjects.routes';
import { teacherRoutes }                from '../content/teacher/teacher.routes';
import { timetableRoutes }              from '../content/timetable/timetable.routes';

export const dashboardRoutes: Routes = [
  ...clasRoutes,
  ...clasSubjectGroupRoutes,
  ...homeworkRoutes,
  ...sectionRoutes,
  ...studentRoutes,
  ...subjectGroupRoutes,
  ...subjectGroupSubjectRoutes,
  ...subjectTeacherRoutes,
  ...subjectStudentRoutes,
  ...subjectsRoutes,
  ...teacherRoutes,
  ...attendanceRoutes,
  ...timetableRoutes
];