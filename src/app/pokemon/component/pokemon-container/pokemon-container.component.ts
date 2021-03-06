import { Component, OnInit } from '@angular/core';

import { Pokemon } from '../../../shared/model/pokemon/pokemon';
import { PokemonService } from '../../../shared/service/pokemon.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemon-container.component.html'
})

export class PokemonContainerComponent implements OnInit {
  pokemons: Pokemon[] = [];
  selectedPokemon?: Pokemon;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemons()
      .subscribe(pokemons => this.pokemons = pokemons);
  }

}
