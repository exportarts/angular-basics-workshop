import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IssueCardComponent } from './components/issue-card/issue-card.component';
import { IssueListComponent } from './components/issue-list/issue-list.component';
import { FilterIssuesPipe } from './pipes/filter-issues.pipe';
import { OverviewComponent } from './views/overview/overview.component';

@NgModule({
  declarations: [
    OverviewComponent,
    IssueListComponent,
    FilterIssuesPipe,
    IssueCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class OverviewModule { }
