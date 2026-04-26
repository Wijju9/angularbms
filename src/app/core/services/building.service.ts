import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class BuildingService {
  private readonly api = inject(ApiService);

  list(params?: Record<string, string | number | boolean>): Observable<unknown> { return this.api.get('buildings', params); }
  getById(id: string): Observable<unknown> { return this.api.get('buildings/' + id); }
  create(payload: unknown): Observable<unknown> { return this.api.post('buildings', payload); }
  update(id: string, payload: unknown): Observable<unknown> { return this.api.put('buildings/' + id, payload); }
  delete(id: string): Observable<unknown> { return this.api.delete('buildings/' + id); }
}
