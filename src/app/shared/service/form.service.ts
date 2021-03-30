import { Injectable } from '@angular/core';
import { Pokemon, pokemonSpec } from '../model/pokemon/pokemon';
import { ElemantaryType } from '../model/elemantary-type/elemantary-type';
import { Move, moveSpec } from '../model/move/move';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  isPokemonFormValid(pokemon: Pokemon): boolean {
    return (
      pokemon.name.trim() !== '' &&
      Object.values(ElemantaryType).includes(pokemon.type) &&
      pokemon.getStatPoint() <= pokemonSpec.maxPoints &&
      pokemon.getStatPoint() > pokemonSpec.minPoint &&
      pokemon.movesIds.length > 0
    );
  }

  getErrorMessage(item: Pokemon | Move): string {
    const type = item instanceof Move ? 'move' : 'pokemon';

    let errorMessage = `Le ${type} doit avoir :`;
    // help us to make sure that the errorMessage variable is updated
    const baseErrorMessage = errorMessage.length;

    const maxPoint =
      type === 'pokemon' ? pokemonSpec.maxPoints : moveSpec.maxPoints;
    const minPoint =
      type === 'pokemon' ? pokemonSpec.minPoint : moveSpec.minPoint;

    if (item.name.trim() === '') {
      errorMessage += '| un nom valide ';
    }

    if (!Object.values(ElemantaryType).includes(item.type)) {
      errorMessage += '| un type élémentaire ';
    }

    if (item.getStatPoint() <= minPoint) {
      errorMessage += '| au moins 5 point de compétence ';
    }

    if (item.getStatPoint() >= maxPoint) {
      errorMessage +=
        '| au maximum ' +
        pokemonSpec.maxPoints.toString(10) +
        ' point de compétence ';
    }

    if (item instanceof Pokemon && item.movesIds.length <= 0) {
      errorMessage += '| au moins 1 attaque ';
    }

    return baseErrorMessage < errorMessage.length
      ? errorMessage
      : `Le ${type} souffre d'un mal inconnu`;
  }

  isMoveFormValid(move: Move): boolean {
    return (
      move.name.trim() !== '' &&
      Object.values(ElemantaryType).includes(move.type) &&
      move.getStatPoint() <= moveSpec.maxPoints &&
      move.getStatPoint() > moveSpec.minPoint
    );
  }
}
