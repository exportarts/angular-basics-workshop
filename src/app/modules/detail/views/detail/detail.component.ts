import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Issue } from '../../../data/models/issue.model';

@Component({
  selector: 'expo-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  issueDoc: AngularFirestoreDocument<Issue>;
  issue: Observable<Issue>;

  form = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null),
    createdAt: new FormGroup({
      seconds: new FormControl(null, Validators.required),
      nanoseconds: new FormControl(null, Validators.required)
    }),
    done: new FormControl(false, Validators.required)
  });

  constructor(
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.issueDoc = this.route.snapshot.data.issue;
    this.issue = this.issueDoc.valueChanges().pipe(
      // Set defaults
      map(issue => {
        issue.description = issue.description || '';
        return issue;
      }),
      // Update form
      tap(issue => this.form.setValue(issue))
    );
  }

  saveChanges() {
    const newIssue = this.form.value;
    this.issueDoc.update(newIssue);
  }

}
