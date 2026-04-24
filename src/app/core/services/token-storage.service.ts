import { Injectable } from '@angular/core';
import { AuthTokens } from '../models/auth.model';

const ACCESS_TOKEN = 'bms_access_token';
const REFRESH_TOKEN = 'bms_refresh_token';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  setTokens(tokens: AuthTokens): void {
    localStorage.setItem(ACCESS_TOKEN, tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN, tokens.refreshToken);
  }

  get accessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  get refreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  clear(): void {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }
}
