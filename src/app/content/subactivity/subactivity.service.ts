import { Injectable }         from '@angular/core';
import { Headers, Http }      from '@angular/http';
import { CookieService }      from 'angular2-cookie/core';
import { SubActivity }        from './subactivity';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SubActivityService {
  private subactivityUrl = 'http://localhost:8080/guldu/webapi/subactivity';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getSubActivities(id: number): Promise<SubActivity[]> {
    let url = `${this.subactivityUrl}/activity/${id}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  save(subactivity: SubActivity): Promise<SubActivity> {
    if (subactivity.id) {
      return this.put(subactivity);
    }
    return this.post(subactivity);
  }

  delete(subactivity: SubActivity) {
    let url = `${this.subactivityUrl}/${subactivity.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  post(subactivity: SubActivity): Promise<SubActivity> {
    return this.http
      .post(this.subactivityUrl, JSON.stringify(subactivity), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  put(subactivity: SubActivity) {
    return this.http
      .put(this.subactivityUrl, JSON.stringify(subactivity), { headers: this.headers })
      .toPromise()
      .then(() => subactivity)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}