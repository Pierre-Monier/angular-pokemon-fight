import {Pipe, PipeTransform} from '@angular/core';
import {ElemantaryType} from '../../../shared/model/elemantary-type/elemantary-type';

@Pipe({name: 'enumToArray'})
export class EnumToArrayPipe implements PipeTransform {
  transform(): string[] {
    return Object.keys(ElemantaryType).map(item => item.toString());
  }
}
