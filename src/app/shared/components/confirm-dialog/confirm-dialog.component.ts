import { Component, EventEmitter, Output, input } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [ModalComponent],
  template: `<app-modal [open]="open()" [title]="title()" (closed)="cancel.emit()">
    <p class="mb-4">{{message()}}</p>
    <div class="flex justify-end gap-2"><button class="btn-outline" (click)="cancel.emit()">Cancel</button><button class="btn-primary" (click)="confirm.emit()">Confirm</button></div>
  </app-modal>`
})
export class ConfirmDialogComponent {
  readonly open = input(false);
  readonly title = input('Please confirm');
  readonly message = input('Are you sure?');
  @Output() readonly cancel = new EventEmitter<void>();
  @Output() readonly confirm = new EventEmitter<void>();
}
