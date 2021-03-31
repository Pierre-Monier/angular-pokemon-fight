import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from '../../../shared/model/pokemon/pokemon';
import { ElemantaryType } from '../../../shared/model/elemantary-type/elemantary-type';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  @Input()
  pokemons!: Pokemon[];
  @Output()
  deleteEvent = new EventEmitter<Pokemon>();
  constructor() { }

  ngOnInit(): void { }

  deletePokemon(pokemon: Pokemon): void {
    this.deleteEvent.emit(pokemon);
  }

  getBadgeClass(type: ElemantaryType): string {
    switch (type) {
      case ElemantaryType.Eau:
        return "eau";
      case ElemantaryType.Foudre:
        return "foudre";
      case ElemantaryType.Feu:
        return "feu";
      case ElemantaryType.Neutre:
        return "neutre";
      case ElemantaryType.Air:
        return "air";
      case ElemantaryType.Terre:
        return "terre";
      default:
        return "test";
    }
  }

  getTypeImage(type: ElemantaryType): string {
    switch (type) {
      case ElemantaryType.Eau:
        return "../assets/water-type.png";
      case ElemantaryType.Foudre:
        return "../assets/electric-type.png";
      case ElemantaryType.Feu:
        return "../assets/fire-type.png";
      case ElemantaryType.Neutre:
        return "../assets/neutral-type.png";
      case ElemantaryType.Air:
        return "../assets/air-type.png";
      case ElemantaryType.Terre:
        return "../assets/earth-type.png";
      default:
        return "test";
    }
  }
}
