import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class VotingService {
  private readonly api = inject(ApiService);

  list(params?: Record<string, string | number | boolean>): Observable<unknown> { return this.api.get('votings', params); }
  getById(id: string): Observable<unknown> { return this.api.get('votings/' + id); }
  create(payload: unknown): Observable<unknown> { return this.api.post('votings', payload); }
  update(id: string, payload: unknown): Observable<unknown> { return this.api.put('votings/' + id, payload); }
  delete(id: string): Observable<unknown> { return this.api.delete('votings/' + id); }
}
