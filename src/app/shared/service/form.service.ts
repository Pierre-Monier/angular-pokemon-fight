import { Injectable } from '@angular/core';
import {Pokemon} from '../model/pokemon/pokemon';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  isFormValid(pokemon: Pokemon): boolean {
    return (pokemon.name.trim() !== '');
  }
}
