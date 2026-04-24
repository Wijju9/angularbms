import { Routes } from '@angular/router';
export const CANTEEN_ROUTES: Routes = [{ path: '', loadComponent: () => import('./canteen.component').then((m) => m.CanteenComponent) }];
