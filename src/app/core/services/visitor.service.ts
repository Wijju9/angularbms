import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class VisitorService {
  private readonly api = inject(ApiService);

  list(params?: Record<string, string | number | boolean>): Observable<unknown> { return this.api.get('visitors', params); }
  getById(id: string): Observable<unknown> { return this.api.get('visitors/' + id); }
  create(payload: unknown): Observable<unknown> { return this.api.post('visitors', payload); }
  update(id: string, payload: unknown): Observable<unknown> { return this.api.put('visitors/' + id, payload); }
  delete(id: string): Observable<unknown> { return this.api.delete('visitors/' + id); }
}
