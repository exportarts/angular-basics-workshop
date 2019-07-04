import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './modules/admin/guards/admin.guard';
import { AdminComponent } from './modules/admin/views/admin/admin.component';
import { DetailViewResolver } from './modules/detail/resolvers/detail-view.resolver';
import { DetailComponent } from './modules/detail/views/detail/detail.component';
import { OverviewComponent } from './modules/overview/views/overview/overview.component';

const routes: Routes = [
  {
    path: 'overview',
    component: OverviewComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'issues/:id',
    component: DetailComponent,
    resolve: {
      issue: DetailViewResolver
    }
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'overview'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
