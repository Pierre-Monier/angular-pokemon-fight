import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon, PokemonStat } from '../../../shared/model/pokemon/pokemon';
import { FormMode } from '../../../shared/model/form-mode/form-mode';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css'],
})
export class PokemonFormComponent implements OnInit {
  @Input()
  pokemon?: Pokemon;
  @Input()
  mode!: FormMode;
  @Input()
  types!: string[];
  @Input()
  points!: number;
  @Output()
  submitEvent = new EventEmitter<Pokemon>();
  @Output()
  goBackEvent = new EventEmitter<void>();
  @Output()
  addPointEvent = new EventEmitter<PokemonStat>();
  @Output()
  removePointEvent = new EventEmitter<PokemonStat>();
  constructor() {}

  ngOnInit(): void {}

  submit(pokemon: Pokemon): void {
    this.submitEvent.emit(pokemon);
  }

  goBack(): void {
    this.goBackEvent.emit();
  }

  addPoint(property: PokemonStat): void {
    this.addPointEvent.emit(property);
  }

  removePoint(property: PokemonStat): void {
    this.removePointEvent.emit(property);
  }
}
