import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  readonly messages = signal<ToastMessage[]>([]);

  push(type: ToastMessage['type'], text: string): void {
    const id = crypto.randomUUID();
    this.messages.update((m) => [...m, { id, type, text }]);
    setTimeout(() => this.remove(id), 3000);
  }

  remove(id: string): void {
    this.messages.update((m) => m.filter((x) => x.id !== id));
  }
}
