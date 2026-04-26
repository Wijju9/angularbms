import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiBaseUrl;

  get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Observable<T> {
    let httpParams = new HttpParams();
    Object.entries(params ?? {}).forEach(([key, value]) => {
      httpParams = httpParams.set(key, String(value));
    });
    return this.http.get<T>(`${this.base}/${endpoint}`, { params: httpParams });
  }

  post<T>(endpoint: string, payload: unknown): Observable<T> {
    return this.http.post<T>(`${this.base}/${endpoint}`, payload);
  }

  put<T>(endpoint: string, payload: unknown): Observable<T> {
    return this.http.put<T>(`${this.base}/${endpoint}`, payload);
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.base}/${endpoint}`);
  }
}
