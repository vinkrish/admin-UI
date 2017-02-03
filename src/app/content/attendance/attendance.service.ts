import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Attendance }    from './attendance';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AttendanceService {
  private attendanceUrl = 'http://localhost:8080/guldu/webapi/attendance';
  private dailyMarkedUrl = 'http://localhost:8080/guldu/webapi/attendance/daily/marked';
  private dailyUnmarkedUrl = 'http://localhost:8080/guldu/webapi/attendance/daily/unmarked';
  private sessionMarkedUrl = 'http://localhost:8080/guldu/webapi/attendance/session/marked';
  private sessionUnmarkedUrl = 'http://localhost:8080/guldu/webapi/attendance/session/unmarked';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  dailyAttendanceMarked(sectionId: number, dateAttendance: Date): Promise<Attendance[]> {
    let url = `${this.dailyMarkedUrl}/section/${sectionId}/date/${dateAttendance}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  dailyAttendanceUnmarked(sectionId: number, dateAttendance: Date): Promise<Attendance[]> {
    let url = `${this.dailyUnmarkedUrl}/section/${sectionId}/date/${dateAttendance}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  sessionAttendanceMarked(session: number, sectionId: number, dateAttendance: Date): Promise<Attendance[]> {
    let url = `${this.sessionMarkedUrl}/${session}/${sectionId}/${dateAttendance}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  sessionAttendanceUnmarked(session: number, sectionId: number, dateAttendance: Date): Promise<Attendance[]> {
    let url = `${this.sessionUnmarkedUrl}/${session}/${sectionId}/${dateAttendance}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  delete(attendance: Attendance) {
    let url = `${this.attendanceUrl}/${attendance.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  post(attendance: Attendance[]) {
    let url = `${this.attendanceUrl}/list`;
    return this.http
      .post(url, JSON.stringify(attendance), { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  private put(attendance: Attendance) {
    let url = `${this.attendanceUrl}/${attendance.id}`;
    return this.http
      .put(url, JSON.stringify(attendance), { headers: this.headers })
      .toPromise()
      .then(() => attendance)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}