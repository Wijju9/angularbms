import { Directive, ElementRef, HostListener, Output, EventEmitter, inject } from '@angular/core';

@Directive({ selector: '[appClickOutside]', standalone: true })
export class ClickOutsideDirective {
  private readonly host = inject(ElementRef<HTMLElement>);
  @Output() readonly appClickOutside = new EventEmitter<void>();
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void { if (!this.host.nativeElement.contains(event.target as Node)) this.appClickOutside.emit(); }
}
