import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { CookieService } from 'angular2-cookie/core';
import { DashboardItem } from '../shared/component/dashboard-item';

@Component({
  selector: 'ui-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

  constructor(private router: Router) { }

  Items1: DashboardItem[] = [
	{ name: 'Class', link: 'class' },
	{ name: 'Section', link: 'section' }
  ];

  Items2: DashboardItem[] = [
	{ name: 'Attendance', link: 'attendance' },
	{ name: 'Homework', link: 'homework' },
	{ name: 'Timetable', link: 'timetable' }
  ];

  Items3: DashboardItem[] = [
	{ name: 'Subject', link: 'subjects' },
	{ name: 'Subject Group', link: 'subject-group' },
	{ name: 'Subject Group Subject', link: 'subject-group-subject' },
	{ name: 'Subject Teacher', link: 'subject-teacher' },
	{ name: 'Subject Student', link: 'subject-student' },
	{ name: 'Class Subject Group', link: 'class-subject-group' }
  ];
  
  Items4: DashboardItem[] = [
	{ name: 'Student', link: 'student' },
	{ name: 'Teacher', link: 'teacher' }
  ];

  gotoDetail(item: string) {
	let link = ['/', item];
	this.router.navigate(link);
  }
}