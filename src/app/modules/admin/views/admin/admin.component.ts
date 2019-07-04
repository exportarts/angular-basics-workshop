import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Issue } from '../../../data/models/issue.model';
import { IssueService } from '../../../data/services/issue.service';
import { descriptions, titles } from './data';

const sample = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

@Component({
  selector: 'expo-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  adminFormGroup = new FormGroup({
    collection: new FormControl(null, [Validators.required])
  });

  constructor(private readonly issueService: IssueService) { }

  ngOnInit() {
  }

  createIssue() {
    const issue: Issue = {
      title: sample(titles),
      description: sample(descriptions),
      createdAt: {
        seconds: new Date().getTime(),
        nanoseconds: 0
      },
      done: false
    };
    this.issueService.createIssue(issue, this.adminFormGroup.get('collection').value);
  }

}
