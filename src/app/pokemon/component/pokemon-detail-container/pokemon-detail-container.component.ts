import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Pokemon } from '../../../shared/model/pokemon/pokemon';
import { PokemonService } from '../../../shared/service/pokemon.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './pokemon-detail-container.component.html'
})

export class PokemonDetailContainerComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location
  ) { }
  static location: Location;
  static pokemonService: PokemonService;
  pokemon?: Pokemon;

  ngOnInit(): void {
    this.getPokemon();
    PokemonDetailContainerComponent.location = this.location;
    PokemonDetailContainerComponent.pokemonService = this.pokemonService;
  }

  getPokemon(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokemonService.getPokemon(id)
        .subscribe(hero => this.pokemon = hero);
    }
  }

  updatePokemon(pokemon: Pokemon): void {
    PokemonDetailContainerComponent.pokemonService.updatePokemon(pokemon);
  }

  goBack(): void  {
    PokemonDetailContainerComponent.location.back();
  }
}
