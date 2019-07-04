import { Component, Input, OnInit } from '@angular/core';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Issue } from '../../../data/models/issue.model';
import { IssueService } from '../../../data/services/issue.service';

@Component({
  selector: 'expo-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.scss']
})
export class IssueCardComponent implements OnInit {

  @Input()
  issue: QueryDocumentSnapshot<Issue>;

  constructor(public readonly issueService: IssueService) { }

  ngOnInit() {
  }

}
