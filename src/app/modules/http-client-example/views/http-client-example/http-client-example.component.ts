import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, User } from '../../models/api.model';
import { HttpClientExampleService } from '../../services/http-client-example.service';

@Component({
  selector: 'expo-http-client-example',
  templateUrl: './http-client-example.component.html',
  styleUrls: ['./http-client-example.component.scss']
})
export class HttpClientExampleComponent implements OnInit {

  users: Observable<User[]>;
  post: Observable<Post>;
  deletedPost: Observable<any>;

  constructor(public readonly service: HttpClientExampleService) { }

  ngOnInit() {
  }

  loadUsers(includeHeaders: boolean) {
    const headers = new HttpHeaders({
      'X-EXPO-TOKEN': 'Made with <3 by Exportarts'
    });
    this.users = this.service.getUsers(includeHeaders ? headers : undefined);
  }

  addPost() {
    this.post = this.service.addPost();
  }

  deletePost() {
    this.deletedPost = this.service.deletePost();
  }

}
