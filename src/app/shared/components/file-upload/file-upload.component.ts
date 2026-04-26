import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `<label class="input cursor-pointer block">Upload PDF<input hidden type="file" accept="application/pdf" (change)="onFile($event)"/></label>
  <p *ngIf="fileName" class="text-xs mt-1">{{fileName}}</p>`
})
export class FileUploadComponent {
  fileName = '';
  @Output() readonly selected = new EventEmitter<File>();
  onFile(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.fileName = file.name;
      this.selected.emit(file);
    }
  }
}
