import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Pokemon, pokemonSpec } from '../../../shared/model/pokemon/pokemon';
import { PokemonService } from '../../../shared/service/pokemon.service';
import { ListContainer } from '../../../shared/interface/list';
import { MoveService } from '../../../shared/service/move.service';

@Component({
  selector: 'app-pokemon-list-container',
  templateUrl: './pokemon-list-container.component.html',
})
export class PokemonListContainerComponent
  implements OnInit, OnDestroy, ListContainer {
  private destroy$ = new Subject<void>();
  pokemons: Pokemon[] = [];
  maxPokemon = pokemonSpec.maxPokemonNbr;

  constructor(
    private pokemonService: PokemonService,
    public moveService: MoveService,
    private afStorage: AngularFireStorage,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.pokemonService
      .getPokemons()
      .pipe(takeUntil(this.destroy$))
      .subscribe((pokemons) => {
        this.pokemons = pokemons;
        this.pokemons.forEach((pokemon, i) => {
          if (pokemon.movesIds) {
            this.moveService
              .getMoves(pokemon.movesIds)
              .pipe(takeUntil(this.destroy$))
              .subscribe((moves) => {
                this.pokemons[i].moves = moves;
              });
          }
        });
      });
  }

  deleteItem(pokemon: Pokemon): void {
    const imageRef = pokemon.isImageUrlDefault()
      ? undefined
      : this.afStorage.ref(pokemon.getImageRef());

    this.pokemonService
      .deletePokemon(pokemon.id)
      .then(() => {
        if (imageRef) {
          imageRef.delete();
        }

        this.toastr.success('Pokemon supprimé');
      })
      .catch(() =>
        this.toastr.error(
          'Il  y a eu un problème lors de la suppression du pokemon'
        )
      );
  }

  ngOnDestroy(): void {
    // emit an event to clean up the this.pokemonService.getPokemons() Observable
    this.destroy$.next();
    this.destroy$.complete();
  }
}
