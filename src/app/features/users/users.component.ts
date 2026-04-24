import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { FormInputComponent } from '../../shared/components/form-input/form-input.component';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DataTableComponent, FormInputComponent],
  template: `<div class="space-y-4"><div class="card"><h2 class="text-xl font-semibold mb-3">Users</h2><form [formGroup]="form" (ngSubmit)="create()" class="grid md:grid-cols-2 gap-3"><app-form-input label="Name" [control]="form.controls.name"></app-form-input><app-form-input label="Email" [control]="form.controls.email"></app-form-input><button class="btn-primary md:col-span-2">Save</button></form></div><div class="card"><app-data-table [rows]="rows()" [columns]="columns"></app-data-table></div></div>`
})
export class UsersComponent {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(UserService);
  readonly columns = ['name', 'email'];
  readonly rows = signal<Record<string, string | number>[]>([]);
  readonly form = this.fb.nonNullable.group({name: [''], email: ['']});
  
  ngOnInit(): void { this.reload(); }
  reload(): void { this.service.list().subscribe((res) => this.rows.set((res as { data?: Record<string, string | number>[] }).data ?? [])); }
  create(): void { this.service.create(this.form.getRawValue()).subscribe(() => this.reload()); }
  
}
