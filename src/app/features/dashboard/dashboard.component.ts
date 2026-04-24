import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthService } from '../../core/services/auth.service';
import { DashboardService } from '../../core/services/dashboard.service';

Chart.register(...registerables);

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `<div class="grid gap-4">
    <div class="grid md:grid-cols-3 gap-4"><div class="card" *ngFor="let c of cards()"><p class="text-slate-500">{{c.label}}</p><h3 class="text-2xl font-bold">{{c.value}}</h3></div></div>
    <div class="card"><canvas id="dashChart"></canvas></div>
  </div>`
})
export class DashboardComponent {
  private readonly auth = inject(AuthService);
  private readonly dashboard = inject(DashboardService);
  readonly data = signal<Record<string, number>>({});
  readonly cards = computed(() => Object.entries(this.data()).map(([label, value]) => ({ label, value })));

  ngOnInit(): void {
    const role = this.auth.user()?.role;
    const call = role === 'SuperAdmin' ? this.dashboard.getSuperAdminOverview() : role === 'BuildingAdmin' ? this.dashboard.getBuildingAdminOverview() : this.dashboard.getResidentOverview();
    call.subscribe((res) => this.data.set(res as Record<string, number>));
    queueMicrotask(() => this.renderChart());
  }

  private renderChart(): void {
    const canvas = document.getElementById('dashChart') as HTMLCanvasElement | null;
    if (!canvas) return;
    new Chart(canvas, { type: 'bar', data: { labels: this.cards().map((x) => x.label), datasets: [{ data: this.cards().map((x) => x.value), label: 'Metrics' }] } });
  }
}
