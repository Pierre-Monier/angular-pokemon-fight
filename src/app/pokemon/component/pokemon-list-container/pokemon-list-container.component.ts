import { Component, OnDestroy, OnInit } from '@angular/core';

import { Pokemon, pokemonSpec } from '../../../shared/model/pokemon/pokemon';
import { PokemonService } from '../../../shared/service/pokemon.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ListContainer } from '../../../shared/interface/list';

@Component({
  selector: 'app-pokemon-list-container',
  templateUrl: './pokemon-list-container.component.html',
})
export class PokemonListContainerComponent
  implements OnInit, OnDestroy, ListContainer {
  private destroy$ = new Subject<void>();
  pokemons: Pokemon[] = [];
  maxPokemon = pokemonSpec.maxPokemonNbr;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.pokemonService
      .getPokemons()
      .pipe(takeUntil(this.destroy$))
      .subscribe((pokemons) => (this.pokemons = pokemons));
  }

  deleteItem(id: string): void {
    this.pokemonService.deletePokemon(id);
  }

  ngOnDestroy(): void {
    // emit an event to clean up the this.pokemonService.getPokemons() Observable
    this.destroy$.next();
    this.destroy$.complete();
  }
}
