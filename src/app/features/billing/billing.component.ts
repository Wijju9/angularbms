import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BillingService } from '../../core/services/billing.service';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { FormInputComponent } from '../../shared/components/form-input/form-input.component';
import { FileUploadComponent } from '../../shared/components/file-upload/file-upload.component';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DataTableComponent, FormInputComponent, FileUploadComponent],
  template: `<div class="space-y-4"><div class="card"><h2 class="text-xl font-semibold mb-3">Billing</h2><form [formGroup]="form" (ngSubmit)="create()" class="grid md:grid-cols-2 gap-3"><app-form-input label="Unit" [control]="form.controls.unit"></app-form-input><app-form-input label="Amount" [control]="form.controls.amount"></app-form-input><app-file-upload (selected)="onFile($event)"></app-file-upload><button type="button" class="btn-outline" (click)="downloadSample()">Download bills</button><button type="button" class="btn-outline">Stripe Pay Mock</button><button class="btn-primary md:col-span-2">Save</button></form></div><div class="card"><app-data-table [rows]="rows()" [columns]="columns"></app-data-table></div></div>`
})
export class BillingComponent {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(BillingService);
  readonly columns = ['unit', 'amount'];
  readonly rows = signal<Record<string, string | number>[]>([]);
  readonly form = this.fb.nonNullable.group({unit: [''], amount: ['']});
  selectedFile?: File;

  ngOnInit(): void { this.reload(); }
  reload(): void { this.service.list().subscribe((res) => this.rows.set((res as { data?: Record<string, string | number>[] }).data ?? [])); }
  create(): void { this.service.create(this.form.getRawValue()).subscribe(() => this.reload()); }
  
  onFile(file: File): void { this.selectedFile = file; }
  downloadSample(): void { window.open('http://localhost:3000/api/billings/download','_blank'); }

}
