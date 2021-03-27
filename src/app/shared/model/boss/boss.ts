import {Pokemon} from '../pokemon/pokemon';

export class Boss {
  id: string;
  name: string;
  imageUrl: string;
  pokemonsIds: string[];
  pokemons?: Pokemon[];
  ranking: number;

  constructor(id: string, name: string, imageUrl: string, pokemonsIds: string[], ranking: number) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.pokemonsIds = pokemonsIds;
    this.ranking = ranking;
  }
}
