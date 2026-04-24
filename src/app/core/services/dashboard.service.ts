import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly api = inject(ApiService);
  getSuperAdminOverview(): Observable<unknown> { return this.api.get('dashboard/super-admin'); }
  getBuildingAdminOverview(): Observable<unknown> { return this.api.get('dashboard/building-admin'); }
  getResidentOverview(): Observable<unknown> { return this.api.get('dashboard/resident'); }
}
