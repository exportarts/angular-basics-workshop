import { Component, Input, OnInit } from '@angular/core';
import { Issue } from '../../../data/models/issue.model';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'expo-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {

  @Input()
  issues: QueryDocumentSnapshot<Issue>[];

  @Input()
  listTitle: string;

  constructor() { }

  ngOnInit() {
  }

}
