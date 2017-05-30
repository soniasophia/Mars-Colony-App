import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Alien} from '../models/alien';

@Injectable()
export class ReportService {

  private REPORT_URL = 'https://red-wdp-api.herokuapp.com/api/mars/aliens';

  constructor(private http: Http) { }

  getData() {
    return this.http.get(this.REPORT_URL)
    .map(this.extractAlien);

  }

  extractAlien(res: Response) {
    const aliens = res.json();
    return aliens;
  }

  handleError() {
    console.log('There was an error');
  }
}