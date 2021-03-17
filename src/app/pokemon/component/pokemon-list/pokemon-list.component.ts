import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Pokemon } from '../../../shared/model/pokemon/pokemon';

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
  deleteEvent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  deletePokemon(id: string): void {
    this.deleteEvent.emit(id);
  }
}
