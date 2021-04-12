import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

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
  isUserHavingMoves?: boolean;

  constructor(
    private pokemonService: PokemonService,
    public moveService: MoveService,
    private afStorage: AngularFireStorage,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getItems();
    this.getMovesData();
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

  getMovesData(): void {
    this.moveService
      .getMoves()
      .pipe(takeUntil(this.destroy$))
      .subscribe((moves) => {
        this.isUserHavingMoves = moves.length > 0;
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

  alertDeleteItem(pokemon: Pokemon): void {
    this.toastr
      .error(
        'Cliquer sur ce message pour confirmer',
        'Attention vous vous apprêtez à supprimer un pokemon'
      )
      .onTap.pipe(take(2))
      .subscribe(() => this.deleteItem(pokemon));
  }

  ngOnDestroy(): void {
    // emit an event to clean up the this.pokemonService.getPokemons() Observable
    this.destroy$.next();
    this.destroy$.complete();
  }
}
