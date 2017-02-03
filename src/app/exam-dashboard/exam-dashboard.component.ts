import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { CookieService } from 'angular2-cookie/core';
import { DashboardItem } from '../shared/component/dashboard-item';

@Component({
  selector: 'ui-exam-dashboard',
  templateUrl: './exam-dashboard.component.html',
  styleUrls: ['./exam-dashboard.component.css']
})

export class ExamDashboardComponent {

  constructor(private router: Router) { }

  Items1: DashboardItem[] = [
	{ name: 'Exam', link: 'exam' },
	{ name: 'Exam Subject Group', link: 'exam-subject-group' },
	{ name: 'Exam Subject', link: 'exam-subject' },
	{ name: 'Mark', link: 'mark' }
  ];

  Items2: DashboardItem[] = [
	{ name: 'Activity', link: 'activity' },
	{ name: 'Sub-Activity', link: 'subactivity' },
	{ name: 'Activity Score', link: 'activity-score' },
	{ name: 'SubActivity Score', link: 'subactivity-score' }
  ];

  Items3: DashboardItem[] = [
	{ name: 'Portion', link: 'portion' },
	{ name: 'Sliptest', link: 'sliptest' },
	{ name: 'Sliptest Score', link: 'sliptest-score' }
  ];

  Items4: DashboardItem[] = [
	{ name: 'Grade Class Wise', link: 'grade-class-wise' }
  ];

  gotoDetail(item: string) {
	console.log(item);
	let link = ['/', item];
	this.router.navigate(link);
  }
}