import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByStatus',
})
export class FilterByStatusPipe implements PipeTransform {
  transform(tasks: any[], status: any): any[] {
    if (tasks == undefined) {
      return [];
    } else {
      let customTasks = tasks.filter((task) => task.status === status);
      return customTasks;
    }
  }
}
