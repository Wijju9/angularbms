import { Routes } from '@angular/router';
export const NOTICES_ROUTES: Routes = [{ path: '', loadComponent: () => import('./notices.component').then((m) => m.NoticesComponent) }];
