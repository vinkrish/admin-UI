import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clas }           from './clas';
import { AttendanceType } from '../../shared/component/attendance-type';
import { ClassService }   from './class.service';

@Component({
  selector: 'ui-class-detail',
  templateUrl: './class-edit.component.html',
  styleUrls: ['./class-edit.component.css']
})

export class ClassEditComponent implements OnInit, OnDestroy {
  clas: Clas;
  @Output() close = new EventEmitter();
  attendanceTypes = [
    new AttendanceType("Daily"),
    new AttendanceType("Session"),
    new AttendanceType("Period")
  ];
  error: any;
  sub: any;
  navigated = false;

  constructor(
    private classService: ClassService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.classService.getClass(id)
          .then(clas => this.clas = clas);
      } else {
        this.navigated = false;
        this.clas = new Clas();
        this.clas.attendanceType = this.attendanceTypes[0].type;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    this.classService
      .save(this.clas)
      .then(clas => {
        this.clas = clas;
        this.goBack(clas);
      })
      .catch(error => this.error = error);
  }

  goBack(savedClas: Clas = null) {
    this.close.emit(savedClas);
    if (this.navigated) { window.history.back(); }
  }

}