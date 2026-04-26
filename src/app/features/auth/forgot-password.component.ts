import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInputComponent } from '../../shared/components/form-input/form-input.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, FormInputComponent],
  template: `<div class="max-w-md mx-auto card"><h2 class="text-xl mb-3">Forgot Password</h2>
  <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-3"><app-form-input label="Email" type="email" [control]="form.controls.email"></app-form-input><button class="btn-primary w-full">Send reset link</button></form></div>`
})
export class ForgotPasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  readonly form = this.fb.nonNullable.group({ email: ['', [Validators.required, Validators.email]] });
  submit(): void { if (this.form.invalid) return; this.auth.forgotPassword(this.form.controls.email.value).subscribe(); }
}
