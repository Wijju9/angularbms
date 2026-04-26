import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  template: `<div class="animate-pulse rounded bg-slate-300 dark:bg-slate-700" [style.height.px]="height()"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonLoaderComponent { readonly height = input(24); }
