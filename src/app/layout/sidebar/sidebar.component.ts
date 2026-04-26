import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserRole } from '../../core/models/auth.model';

interface NavItem { label: string; path: string; roles?: UserRole[]; }

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `<aside class="h-full bg-slate-900 text-slate-100" [class.w-16]="collapsed()" [class.w-64]="!collapsed()">
    <button class="p-3" (click)="collapsed.update(v=>!v)">☰</button>
    <nav class="space-y-1 p-2">
      <a *ngFor="let item of visibleItems()" [routerLink]="item.path" routerLinkActive="bg-slate-700" class="block rounded p-2">{{collapsed() ? item.label[0] : item.label}}</a>
    </nav>
  </aside>`
})
export class SidebarComponent {
  private readonly auth = inject(AuthService);
  readonly collapsed = signal(false);
  readonly items: NavItem[] = [
    {label:'Dashboard',path:'/dashboard'}, {label:'Buildings',path:'/buildings',roles:['SuperAdmin','BuildingAdmin']},
    {label:'Users',path:'/users',roles:['SuperAdmin','BuildingAdmin']}, {label:'Billing',path:'/billing'}, {label:'Parking',path:'/parking'},
    {label:'Visitors',path:'/visitors'}, {label:'Canteen',path:'/canteen'}, {label:'Complaints',path:'/complaints'},
    {label:'Voting',path:'/voting'}, {label:'Notices',path:'/notices'}
  ];
  readonly visibleItems = computed(() => {
    const role = this.auth.user()?.role;
    return this.items.filter((x) => !x.roles || (role && x.roles.includes(role)));
  });
}
