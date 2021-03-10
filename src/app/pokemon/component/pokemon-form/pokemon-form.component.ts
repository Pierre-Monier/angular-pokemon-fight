import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pokemon} from '../../../shared/model/pokemon/pokemon';
import {FormMode} from '../../../shared/model/form-mode/form-mode';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {
  @Input()
  pokemon?: Pokemon;
  @Input()
  mode!: FormMode;
  @Output()
  submitEvent = new EventEmitter<Pokemon>();
  @Output()
  goBackEvent = new EventEmitter<void>();
  @Input()
  types!: string[];
  constructor() { }

  ngOnInit(): void { }

  submit(pokemon: Pokemon): void {
    this.submitEvent.emit(pokemon);
  }

  goBack(): void {
    this.goBackEvent.emit();
  }
}
