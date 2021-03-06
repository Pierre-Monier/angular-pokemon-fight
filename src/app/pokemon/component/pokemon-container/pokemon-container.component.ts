import {Component, OnDestroy, OnInit} from '@angular/core';

import { Pokemon } from '../../../shared/model/pokemon/pokemon';
import { PokemonService } from '../../../shared/service/pokemon.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemon-container.component.html'
})

export class PokemonContainerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  pokemons: Pokemon[] = [];
  selectedPokemon?: Pokemon;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemons().pipe(takeUntil(this.destroy$))
      .subscribe(pokemons => this.pokemons = pokemons);
  }

  ngOnDestroy(): void {
    // emit an event to clean up the this.pokemonService.getPokemons() Observable
    this.destroy$.next();
    this.destroy$.complete();
  }
}
