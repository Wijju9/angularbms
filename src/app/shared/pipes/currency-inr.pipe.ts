import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currencyInr', standalone: true })
export class CurrencyInrPipe implements PipeTransform {
  transform(value: number): string { return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value); }
}
