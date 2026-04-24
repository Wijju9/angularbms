import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `<header class="h-14 px-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
    <h1 class="font-semibold">BMS</h1>
    <div class="flex items-center gap-2">
      <button class="btn-outline" (click)="theme.toggle()">{{theme.isDark() ? 'Light':'Dark'}}</button>
      <button class="btn-outline" (click)="auth.logout()">Logout</button>
    </div>
  </header>`
})
export class HeaderComponent { readonly theme = inject(ThemeService); readonly auth = inject(AuthService); }
