import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';
import { CookieService }  from 'angular2-cookie/core';
import { Clas }           from '../class/clas';
import { SubjectTeacher } from './subject-teacher';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SubjectTeacherService {
  private subjectTeacherUrl = 'http://localhost:8080/guldu/webapi/subjectteacher';
  private sharedUrl = 'http://localhost:8080/guldu/webapi/shared/subjectteacher';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getSubjectTeachers(id: number): Promise<SubjectTeacher[]> {
    let url = `${this.subjectTeacherUrl}/section/${id}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getSubjectTeacher(sectionId: number, subjectTeacherId: number) {
    return this.getSubjectTeachers(sectionId)
      .then(subjectTeachers => subjectTeachers.find(subjectTeacher => subjectTeacher.id === subjectTeacherId));
  }

  save(clas: Clas) {
    return this.post(clas);
  }

  delete(subjectTeacher: SubjectTeacher) {
    let url = `${this.subjectTeacherUrl}/${subjectTeacher.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  private post(clas: Clas) {
    return this.http
      .post(this.sharedUrl, JSON.stringify(clas), { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  put(subjectTeacher: SubjectTeacher) {
    let url = `${this.subjectTeacherUrl}/${subjectTeacher.id}`;
    return this.http
      .put(url, JSON.stringify(subjectTeacher), { headers: this.headers })
      .toPromise()
      .then(() => subjectTeacher)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}