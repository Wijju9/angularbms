import { ErrorHandler, Injectable, inject } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  private readonly notification = inject(NotificationService);

  handleError(error: unknown): void {
    console.error(error);
    this.notification.push('error', 'An application error occurred.');
  }
}
