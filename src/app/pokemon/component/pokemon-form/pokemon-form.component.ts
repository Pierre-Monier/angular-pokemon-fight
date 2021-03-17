import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../../shared/model/pokemon/pokemon';
import { AppStat } from '../../../shared/interface/app-stat';
import { Move } from '../../../shared/model/move/move';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css'],
})
export class PokemonFormComponent {
  @Input()
  pokemon!: Pokemon;
  @Input()
  types!: string[];
  @Input()
  points!: number;
  @Input()
  moves?: Move[];
  @Output()
  submitEvent = new EventEmitter<Pokemon>();
  @Output()
  goBackEvent = new EventEmitter<void>();
  @Output()
  addPointEvent = new EventEmitter<AppStat>();
  @Output()
  removePointEvent = new EventEmitter<AppStat>();
  constructor() {}

  submit(pokemon: Pokemon): void {
    this.submitEvent.emit(pokemon);
  }

  goBack(): void {
    this.goBackEvent.emit();
  }

  addPoint(property: AppStat): void {
    this.addPointEvent.emit(property);
  }

  removePoint(property: AppStat): void {
    this.removePointEvent.emit(property);
  }
}
