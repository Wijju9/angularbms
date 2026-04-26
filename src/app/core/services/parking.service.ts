import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class ParkingService {
  private readonly api = inject(ApiService);

  list(params?: Record<string, string | number | boolean>): Observable<unknown> { return this.api.get('parkings', params); }
  getById(id: string): Observable<unknown> { return this.api.get('parkings/' + id); }
  create(payload: unknown): Observable<unknown> { return this.api.post('parkings', payload); }
  update(id: string, payload: unknown): Observable<unknown> { return this.api.put('parkings/' + id, payload); }
  delete(id: string): Observable<unknown> { return this.api.delete('parkings/' + id); }
}
