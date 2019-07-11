import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post, User } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class HttpClientExampleService {

  private readonly BASE_URL = 'https://jsonplaceholder.typicode.com';

  constructor(private readonly http: HttpClient) { }

  getUsers(headers?: HttpHeaders) {
    const url = this.BASE_URL + '/users';
    return this.http.get<User[]>(url, { headers });
  }

  addPost() {
    const url = this.BASE_URL + '/posts';
    return this.http.post<Post>(url, {
      title: 'My Post',
      body: `This post has been submitted at ${new Date().toISOString()}`
    });
  }

  deletePost() {
    const url = this.BASE_URL + '/posts/1';
    return this.http.delete(url);
  }

}
