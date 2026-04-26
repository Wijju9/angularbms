import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const appRoutes: Routes = [
  { path: 'auth', loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES) },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/app-shell.component').then((m) => m.AppShellComponent),
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent) },
      { path: 'buildings', canActivate: [roleGuard], data: { roles: ['SuperAdmin', 'BuildingAdmin'] }, loadChildren: () => import('./features/buildings/buildings.routes').then((m) => m.BUILDINGS_ROUTES) },
      { path: 'users', canActivate: [roleGuard], data: { roles: ['SuperAdmin', 'BuildingAdmin'] }, loadChildren: () => import('./features/users/users.routes').then((m) => m.USERS_ROUTES) },
      { path: 'billing', loadChildren: () => import('./features/billing/billing.routes').then((m) => m.BILLING_ROUTES) },
      { path: 'parking', loadChildren: () => import('./features/parking/parking.routes').then((m) => m.PARKING_ROUTES) },
      { path: 'visitors', loadChildren: () => import('./features/visitors/visitors.routes').then((m) => m.VISITORS_ROUTES) },
      { path: 'canteen', loadChildren: () => import('./features/canteen/canteen.routes').then((m) => m.CANTEEN_ROUTES) },
      { path: 'complaints', loadChildren: () => import('./features/complaints/complaints.routes').then((m) => m.COMPLAINTS_ROUTES) },
      { path: 'voting', loadChildren: () => import('./features/voting/voting.routes').then((m) => m.VOTING_ROUTES) },
      { path: 'notices', loadChildren: () => import('./features/notices/notices.routes').then((m) => m.NOTICES_ROUTES) },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
    ]
  },
  { path: '**', redirectTo: '/dashboard' }
];
