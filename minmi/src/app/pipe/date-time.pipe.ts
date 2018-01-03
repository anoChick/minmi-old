import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(date: number): string {
    moment.locale("ja");
    return moment(date).format('LLLL');
  }

}
