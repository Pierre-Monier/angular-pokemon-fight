import {Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Pokemon } from '../../../shared/model/pokemon/pokemon';
import { PokemonService } from '../../../shared/service/pokemon.service';
import { FormMode } from '../../../shared/model/form-mode/form-mode';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FormService} from '../../../shared/service/form.service';

@Component({
  selector: 'app-pokemon-edit',
  templateUrl: './pokemon-edit-container.component.html'
})

export class PokemonEditContainerComponent implements OnInit, OnDestroy {
  pokemon?: Pokemon;
  formMode = FormMode.Update;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokemonService.getPokemon(id).pipe(takeUntil(this.destroy$))
        .subscribe(hero => this.pokemon = hero);
    } else {
      console.error('Trying to edit a pokemon without specifying a id');
    }
  }

  updatePokemon(pokemon: Pokemon): void {
    if (this.formService.isFormValid(pokemon)) {
      this.pokemonService.updatePokemon(pokemon);
    } else {
      console.error('Trying to update pokemon with wrong values');
    }
  }

  goBack(): void  {
    this.location.back();
  }

  ngOnDestroy(): void {
    // emit an event to clean up the this.pokemonService.getPokemon() Observable
    this.destroy$.next();
    this.destroy$.complete();
  }
}
