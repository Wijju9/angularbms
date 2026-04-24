import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from '../../shared/components/form-input/form-input.component';
import { AuthService } from '../../core/services/auth.service';
import { UserRole } from '../../core/models/auth.model';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormInputComponent],
  template: `<div class="max-w-md mx-auto card"><h2 class="text-xl mb-3">Register</h2>
  <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-3">
    <app-form-input label="Name" [control]="form.controls.name"></app-form-input>
    <app-form-input label="Email" [control]="form.controls.email" type="email"></app-form-input>
    <app-form-input label="Password" [control]="form.controls.password" type="password"></app-form-input>
    <label class="block text-sm">Role</label>
    <select class="input" formControlName="role"><option *ngFor="let role of roles" [value]="role">{{ role }}</option></select>
    <button class="btn-primary w-full">Create account</button>
  </form></div>`
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly roles: UserRole[] = ['Resident', 'Tenant', 'SecurityStaff', 'MaintenanceStaff', 'CanteenStaff', 'BuildingAdmin', 'SuperAdmin'];
  readonly form = this.fb.nonNullable.group({ name: ['', Validators.required], email: ['', [Validators.required, Validators.email]], password: ['', Validators.required], role: ['Resident' as UserRole, Validators.required] });
  submit(): void { if (this.form.invalid) return; this.auth.register(this.form.getRawValue()).subscribe(() => this.router.navigateByUrl('/dashboard')); }
}
