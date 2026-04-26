import { Routes } from '@angular/router';
export const VOTING_ROUTES: Routes = [{ path: '', loadComponent: () => import('./voting.component').then((m) => m.VotingComponent) }];
