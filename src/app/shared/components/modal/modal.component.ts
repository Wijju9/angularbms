import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `<div *ngIf="open()" class="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4">
    <div class="card w-full max-w-lg">
      <div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold">{{title()}}</h3><button (click)="closed.emit()">✕</button></div>
      <ng-content></ng-content>
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  readonly open = input(false);
  readonly title = input('Modal');
  @Output() readonly closed = new EventEmitter<void>();
}
