import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from '../../../shared/model/pokemon/pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  @Input()
  title!: string;
  @Input()
  pokemons!: Pokemon[];
  @Input()
  selectedPokemon?: Pokemon;
  constructor() { }

  ngOnInit(): void {
  }

}
