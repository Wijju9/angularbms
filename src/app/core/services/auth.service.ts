import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ApiService } from './api.service';
import { TokenStorageService } from './token-storage.service';
import { AuthResponse, AuthUser, UserRole } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(ApiService);
  private readonly tokens = inject(TokenStorageService);
  private readonly router = inject(Router);

  readonly user = signal<AuthUser | null>(null);
  readonly isAuthenticated = computed(() => Boolean(this.tokens.accessToken));

  login(email: string, password: string): Observable<AuthUser> {
    return this.api.post<AuthResponse>('auth/login', { email, password }).pipe(
      tap((res) => this.tokens.setTokens(res)),
      tap((res) => this.user.set(res.user)),
      map((res) => res.user)
    );
  }

  register(payload: { name: string; email: string; password: string; role: UserRole }): Observable<AuthUser> {
    return this.api.post<AuthResponse>('auth/register', payload).pipe(
      tap((res) => this.tokens.setTokens(res)),
      tap((res) => this.user.set(res.user)),
      map((res) => res.user)
    );
  }

  forgotPassword(email: string): Observable<{ message: string }> {
    return this.api.post<{ message: string }>('auth/forgot-password', { email });
  }

  refreshToken(): Observable<boolean> {
    const refreshToken = this.tokens.refreshToken;
    if (!refreshToken) return of(false);
    return this.api.post<AuthResponse>('auth/refresh-token', { refreshToken }).pipe(
      tap((res) => this.tokens.setTokens(res)),
      tap((res) => this.user.set(res.user)),
      map(() => true),
      catchError(() => {
        this.logout();
        return of(false);
      })
    );
  }

  logout(): void {
    this.tokens.clear();
    this.user.set(null);
    this.router.navigateByUrl('/auth/login');
  }
}
