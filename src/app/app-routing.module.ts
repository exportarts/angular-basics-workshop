import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './modules/admin/guards/admin.guard';
import { AdminComponent } from './modules/admin/views/admin/admin.component';
import { DetailViewResolver } from './modules/detail/resolvers/detail-view.resolver';
import { DetailComponent } from './modules/detail/views/detail/detail.component';
import { HttpClientExampleComponent } from './modules/http-client-example/views/http-client-example/http-client-example.component';
import { OverviewComponent } from './modules/overview/views/overview/overview.component';
import { CounterExampleComponent } from './modules/store-example/components/counter-example/counter-example.component';

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
    path: 'http-client-example',
    component: HttpClientExampleComponent
  },
  {
    path: 'store-example',
    component: CounterExampleComponent
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
