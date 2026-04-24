import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="fixed right-4 top-4 z-50 space-y-2">
    <div *ngFor="let m of notifications.messages()" class="rounded px-3 py-2 text-white" [ngClass]="{'bg-green-600':m.type==='success','bg-red-600':m.type==='error','bg-blue-600':m.type==='info'}">{{m.text}}</div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent { protected readonly notifications = inject(NotificationService); }
