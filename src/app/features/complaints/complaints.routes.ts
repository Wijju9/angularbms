import { Routes } from '@angular/router';
export const COMPLAINTS_ROUTES: Routes = [{ path: '', loadComponent: () => import('./complaints.component').then((m) => m.ComplaintsComponent) }];
