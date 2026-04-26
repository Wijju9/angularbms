import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="mb-2"><input class="input" placeholder="Filter..." [value]="filter()" (input)="filter.set(($event.target as HTMLInputElement).value)" /></div>
  <div class="hidden md:block overflow-x-auto">
    <table class="w-full text-sm"><thead><tr><th *ngFor="let c of columns()" class="text-left p-2">{{c}}</th></tr></thead>
    <tbody><tr *ngFor="let row of pagedRows()" class="border-t border-slate-200 dark:border-slate-700"><td *ngFor="let c of columns()" class="p-2">{{row[c]}}</td></tr></tbody></table>
  </div>
  <div class="md:hidden space-y-2"><div *ngFor="let row of pagedRows()" class="card"><div *ngFor="let c of columns()"><span class="font-medium">{{c}}:</span> {{row[c]}}</div></div></div>
  <div class="mt-2 flex justify-end gap-2"><button class="btn-outline" (click)="prev()" [disabled]="page()===1">Prev</button><button class="btn-outline" (click)="next()">Next</button></div>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
  readonly rows = input<Record<string, string | number>[]>([]);
  readonly columns = input<string[]>([]);
  readonly filter = signal('');
  readonly page = signal(1);
  readonly pageSize = 8;

  readonly filteredRows = computed(() => this.rows().filter((row) => JSON.stringify(row).toLowerCase().includes(this.filter().toLowerCase())));
  readonly pagedRows = computed(() => this.filteredRows().slice((this.page() - 1) * this.pageSize, this.page() * this.pageSize));

  next(): void { if (this.page() * this.pageSize < this.filteredRows().length) this.page.update((v) => v + 1); }
  prev(): void { if (this.page() > 1) this.page.update((v) => v - 1); }
}
