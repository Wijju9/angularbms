import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CanteenService {
  private readonly api = inject(ApiService);

  list(params?: Record<string, string | number | boolean>): Observable<unknown> { return this.api.get('canteens', params); }
  getById(id: string): Observable<unknown> { return this.api.get('canteens/' + id); }
  create(payload: unknown): Observable<unknown> { return this.api.post('canteens', payload); }
  update(id: string, payload: unknown): Observable<unknown> { return this.api.put('canteens/' + id, payload); }
  delete(id: string): Observable<unknown> { return this.api.delete('canteens/' + id); }
}
