import { Pokemon, PokemonStat } from '../../model/pokemon/pokemon';
import { Move } from '../../model/move/move';

export interface FormContainer {
  init: () => void;
  submit: (entity: any) => void;
  updatePoints: () => void;
  addPoint: (property: any) => void;
  removePoint: (property: any) => void;
  goBack: () => void;
}

export type FormMode = 'create' | 'update';
