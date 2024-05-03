import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { RolesComponent } from './components/roles/roles.component';
import { AuthorizationsComponent } from './components/authorizations/authorizations.component';
import { PlansComponent } from './components/plans/plans.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
// import { NgModule } from '@angular/core';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/login',
  //   pathMatch: 'full'
  // },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
      { path: 'users', component: UsersComponent, canActivate: [authGuard] },
      { path: 'roles', component: RolesComponent, canActivate: [authGuard] },
      { path: 'plans', component: PlansComponent, canActivate: [authGuard] },
      { path: 'subscriptions', component: SubscriptionsComponent, canActivate: [authGuard] },
      { path: 'authorizations', component: AuthorizationsComponent, canActivate: [authGuard] },
    ]
  }
];

// Test for routerLink

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }