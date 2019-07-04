import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../../../../../environments/environment';
import { Issue } from '../../../data/models/issue.model';

@Component({
  selector: 'expo-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private readonly firestore: AngularFirestore) { }

  ngOnInit() {
  }

  createIssue() {
    const issue: Issue = {
      title: 'My Issue',
      createdAt: {
        seconds: new Date().getTime(),
        nanoseconds: 0
      },
      done: false
    };
    this.firestore.collection(environment.firebase.collection).add(issue);
  }

}
