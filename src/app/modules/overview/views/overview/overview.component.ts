import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../../data/services/issue.service';

@Component({
  selector: 'expo-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(public readonly issueService: IssueService) { }

  ngOnInit() {
  }

}
