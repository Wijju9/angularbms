import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ToastComponent } from '../shared/components/toast/toast.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, FooterComponent, ToastComponent],
  template: `<div class="h-screen grid grid-cols-[auto_1fr]">
    <app-sidebar class="hidden md:block"></app-sidebar>
    <div class="grid grid-rows-[auto_1fr_auto] min-h-0">
      <app-header></app-header>
      <main class="overflow-auto p-4"><router-outlet /></main>
      <app-footer></app-footer>
    </div>
  </div>
  <app-toast />`
})
export class AppShellComponent {}
