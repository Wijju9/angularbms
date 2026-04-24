import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormInputComponent } from '../../shared/components/form-input/form-input.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormInputComponent],
  template: `<div class="max-w-md mx-auto card"><h2 class="text-xl font-semibold mb-4">Login</h2>
    <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-3">
      <app-form-input label="Email" [control]="form.controls.email" type="email" errorText="Valid email required"></app-form-input>
      <app-form-input label="Password" [control]="form.controls.password" type="password" errorText="Password required"></app-form-input>
      <button class="btn-primary w-full">Login</button>
    </form>
    <div class="mt-3 text-sm"><a routerLink="/auth/register">Register</a> · <a routerLink="/auth/forgot-password">Forgot?</a></div></div>`
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly form = this.fb.nonNullable.group({ email: ['', [Validators.required, Validators.email]], password: ['', Validators.required] });
  submit(): void { if (this.form.invalid) return; const { email, password } = this.form.getRawValue(); this.auth.login(email, password).subscribe(() => this.router.navigateByUrl('/dashboard')); }
}
