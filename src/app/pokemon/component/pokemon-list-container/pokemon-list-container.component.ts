import { Component, OnDestroy, OnInit } from '@angular/core';

import { Pokemon, pokemonSpec } from '../../../shared/model/pokemon/pokemon';
import { PokemonService } from '../../../shared/service/pokemon.service';
import {Observable, Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ListContainer } from '../../../shared/interface/list';
import {Move} from "../../../shared/model/move/move";
import {MoveService} from "../../../shared/service/move.service";

@Component({
  selector: 'app-pokemon-list-container',
  templateUrl: './pokemon-list-container.component.html',
})
export class PokemonListContainerComponent
  implements OnInit, OnDestroy, ListContainer {
  private destroy$ = new Subject<void>();
  pokemons: Pokemon[] = [];
  maxPokemon = pokemonSpec.maxPokemonNbr;

  constructor(private pokemonService: PokemonService, public moveService: MoveService) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.pokemonService
      .getPokemons()
      .pipe(takeUntil(this.destroy$))
      .subscribe((pokemons) => {
        this.pokemons = pokemons;
        this.pokemons.map((pokemon, i) => {
          if (pokemon.movesIds) {
            this.moveService.getMoves(pokemon.movesIds).pipe(takeUntil(this.destroy$)).subscribe((moves) => {
              this.pokemons[i].moves = moves;
            })
          }
        });
      });
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
