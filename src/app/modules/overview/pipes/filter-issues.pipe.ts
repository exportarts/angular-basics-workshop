import { Pipe, PipeTransform } from '@angular/core';
import { Issue } from '../../data/models/issue.model';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';

@Pipe({
  name: 'filterIssues'
})
export class FilterIssuesPipe implements PipeTransform {

  transform(issues: QueryDocumentSnapshot<Issue>[], property: string, matchValue: any): QueryDocumentSnapshot<Issue>[] {
    if (!issues) {
      return null;
    }
    return issues.filter(issue => issue.data()[property] === matchValue);
  }

}
