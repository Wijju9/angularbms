import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class NoticeService {
  private readonly api = inject(ApiService);

  list(params?: Record<string, string | number | boolean>): Observable<unknown> { return this.api.get('notices', params); }
  getById(id: string): Observable<unknown> { return this.api.get('notices/' + id); }
  create(payload: unknown): Observable<unknown> { return this.api.post('notices', payload); }
  update(id: string, payload: unknown): Observable<unknown> { return this.api.put('notices/' + id, payload); }
  delete(id: string): Observable<unknown> { return this.api.delete('notices/' + id); }
}
