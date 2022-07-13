import { Pipe, PipeTransform } from '@angular/core';
import { Icoment } from '../interfaces/user.interface';

@Pipe({
  name: 'userName',
})
export class UserNamePipe implements PipeTransform {
  transform(value: Icoment, isUpper: boolean): string {
    return isUpper ? value.name.toUpperCase() : value.name.toLowerCase();
  }
}
