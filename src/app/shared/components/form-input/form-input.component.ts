import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<label class="block text-sm mb-1">{{label()}}</label>
  <input class="input" [type]="type()" [formControl]="control()" [placeholder]="placeholder()"/>
  <p *ngIf="control().invalid && control().touched" class="text-xs text-red-600 mt-1">{{errorText()}}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormInputComponent {
  readonly label = input.required<string>();
  readonly type = input('text');
  readonly placeholder = input('');
  readonly errorText = input('Invalid value');
  readonly control = input.required<any>();
}
