import { Component, OnInit } from '@angular/core';
import { Alien } from '../../models/alien';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [ReportService]
})
export class ReportComponent implements OnInit {

  alien: Alien[] = [];

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.reportService.getData()
    .subscribe((data) => {
      console.log(data);
      this.alien = data.aliens;
    });
  }
}
