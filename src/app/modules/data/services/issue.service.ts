import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Issue } from '../models/issue.model';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private readonly collection: AngularFirestoreCollection<Issue>;
  private readonly changeActions: Observable<DocumentChangeAction<Issue>[]>;
  readonly issues: Observable<QueryDocumentSnapshot<Issue>[]>;

  constructor(private readonly firestore: AngularFirestore) {
    this.collection = this.firestore.collection<Issue>(environment.firebase.collection);
    this.changeActions = this.collection.snapshotChanges();
    this.issues = this.changeActions.pipe(
      map(actions => actions.map(action => action.payload.doc))
    )
  }

  toggleIssue(issue: QueryDocumentSnapshot<Issue>) {
    const data = issue.data();
    data.done = !data.done;
    this.collection.doc(issue.id).set(data);
  }

  createIssue(issue: Issue, collection = environment.firebase.collection) {
    this.firestore.collection<Issue>(collection).add(issue);
  }

  getIssue(id: string) {
    return this.collection.doc<Issue>(id);
  }
}
