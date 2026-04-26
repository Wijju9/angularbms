import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `<div class="animate-spin rounded-full border-4 border-indigo-300 border-t-indigo-600" [style.width.px]="size()" [style.height.px]="size()"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingSpinnerComponent { readonly size = input(32); }
