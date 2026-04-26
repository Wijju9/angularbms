import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class BillingService {
  private readonly api = inject(ApiService);

  list(params?: Record<string, string | number | boolean>): Observable<unknown> { return this.api.get('billings', params); }
  getById(id: string): Observable<unknown> { return this.api.get('billings/' + id); }
  create(payload: unknown): Observable<unknown> { return this.api.post('billings', payload); }
  update(id: string, payload: unknown): Observable<unknown> { return this.api.put('billings/' + id, payload); }
  delete(id: string): Observable<unknown> { return this.api.delete('billings/' + id); }
}
