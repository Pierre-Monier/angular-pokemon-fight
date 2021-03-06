import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Pokemon } from '../../../shared/model/pokemon/pokemon';
import { PokemonService } from '../../../shared/service/pokemon.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './pokemon-detail-container.component.html'
})

export class PokemonDetailContainerComponent implements OnInit, OnDestroy {
  pokemon?: Pokemon;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokemonService.getPokemon(id).pipe(takeUntil(this.destroy$))
        .subscribe(hero => this.pokemon = hero);
    }
  }

  updatePokemon(pokemon: Pokemon): void {
    this.pokemonService.updatePokemon(pokemon);
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
