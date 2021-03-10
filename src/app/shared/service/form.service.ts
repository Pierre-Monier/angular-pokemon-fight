import { Injectable } from '@angular/core';
import {Pokemon} from '../model/pokemon/pokemon';
import {ElemantaryType} from '../model/elemantary-type/elemantary-type';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  isFormValid(pokemon: Pokemon): boolean {
    return (pokemon.name.trim() !== '' && Object.values(ElemantaryType).includes(pokemon.type));
  }
}
