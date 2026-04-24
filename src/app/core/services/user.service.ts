import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly api = inject(ApiService);

  list(params?: Record<string, string | number | boolean>): Observable<unknown> { return this.api.get('users', params); }
  getById(id: string): Observable<unknown> { return this.api.get('users/' + id); }
  create(payload: unknown): Observable<unknown> { return this.api.post('users', payload); }
  update(id: string, payload: unknown): Observable<unknown> { return this.api.put('users/' + id, payload); }
  delete(id: string): Observable<unknown> { return this.api.delete('users/' + id); }
}
