import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pokemon} from '../../../shared/model/pokemon/pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  @Input()
  title!: string;
  @Input()
  pokemons!: Pokemon[];
  @Output()
  deleteEvent = new EventEmitter<Pokemon>();
  constructor() {}

  ngOnInit(): void {}

  deletePokemon(pokemon: Pokemon): void {
    this.deleteEvent.emit(pokemon);
  }
}
