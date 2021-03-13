import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {
  Pokemon,
  PokemonStat,
  pokemonStatDetail,
  getPokemonStatPoint,
  defaultPokemon,
} from '../../../shared/model/pokemon/pokemon';
import { PokemonService } from '../../../shared/service/pokemon.service';
import { FormMode } from '../../../shared/model/form-mode/form-mode';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormService } from '../../../shared/service/form.service';
import { elemantaryTypeToArray } from '../../../shared/model/elemantary-type/elemantary-type';

@Component({
  selector: 'app-pokemon-form-container',
  templateUrl: './pokemon-form-container.component.html',
})
export class PokemonFormContainerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  pokemon = defaultPokemon;
  elemantaryTypes = elemantaryTypeToArray();
  points = pokemonStatDetail.max;
  type: FormMode;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location,
    private formService: FormService
  ) {
    const { type } = this.route.snapshot.data;
    this.type = type;
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    if (this.type === 'update') {
      const id: string | null = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.pokemonService
          .getPokemon(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe((pokemon) => {
            if (pokemon) {
              this.pokemon = pokemon;
              // we update the current points base on the existing pokemon
              this.updatePoints();
            }
          });
      } else {
        console.error('Trying to edit a pokemon without specifying a id');
      }
    } else if (this.type !== 'create') {
      console.error('Trying to create a form with the wrong type');
    }
  }

  updatePokemon(pokemon: Pokemon): void {
    if (this.formService.isPokemonFormValid(pokemon)) {
      this.pokemonService.submitPokemon(this.type, pokemon);
      this.goBack();
    } else {
      console.error('Trying to update pokemon with wrong values');
    }
  }

  updatePoints(): void {
    this.points = pokemonStatDetail.max - getPokemonStatPoint(this.pokemon);
  }

  addPoint(property: PokemonStat): void {
    if (this.points > 0) {
      this.pokemon[property] += 5;
      this.points -= 5;
    }
  }

  removePoint(property: PokemonStat): void {
    if (this.points < 60 && this.pokemon[property] > 0) {
      this.pokemon[property] -= 5;
      this.points += 5;
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    // emit an event to clean up the this.pokemonService.getPokemon() Observable
    this.destroy$.next();
    this.destroy$.complete();
  }
}
