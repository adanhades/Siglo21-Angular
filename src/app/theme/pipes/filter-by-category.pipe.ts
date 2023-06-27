import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {
  transform(items:Array<any>, category?:number) {
    return items.find(item => item.category_id == category);
  }
}