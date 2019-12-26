import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderby'
})
export class OrderbyPipe implements PipeTransform {

  transform(value: any[], propertyName: string): any[] {
    if (propertyName) {
      return value.sort((a: any, b: any) => a[propertyName] > b[propertyName] ? 1 : a[propertyName] < b[propertyName] ? -1: 0);
    } else
      return value;
   }

}
