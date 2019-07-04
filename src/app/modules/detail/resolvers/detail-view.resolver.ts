import { Injectable } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Issue } from '../../data/models/issue.model';
import { IssueService } from '../../data/services/issue.service';

@Injectable({
    providedIn: 'root'
})
export class DetailViewResolver implements Resolve<AngularFirestoreDocument<Issue>> {

    constructor(
        private readonly service: IssueService,
        private readonly router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): AngularFirestoreDocument<Issue> {
        const id = route.params['id'];
        if (!id) {
            this.router.navigate(['']);
            return null;
        }
        return this.service.getIssue(id);
    }
}
