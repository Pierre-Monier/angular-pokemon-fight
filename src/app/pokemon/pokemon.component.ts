import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../shared/model/pokemon/pokemon';
import { PokemonService } from '../shared/service/pokemon.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})

export class PokemonComponent implements OnInit {
  pokemons: Pokemon[] = [];
  selectedPokemon?: Pokemon;

  constructor(private heroService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.heroService.getHeroes()
      .subscribe(pokemons => this.pokemons = pokemons);
  }

}
