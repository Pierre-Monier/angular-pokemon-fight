import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Pokemon} from '../../../shared/model/pokemon/pokemon';
import {AppStat} from '../../../shared/interface/app-stat';
import {Move} from '../../../shared/model/move/move';
import {ElemantaryType} from '../../../shared/model/elemantary-type/elemantary-type';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss'],
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
  @Input()
  avatarSrc!: string;
  @Output()
  submitEvent = new EventEmitter<Pokemon>();
  @Output()
  goBackEvent = new EventEmitter<void>();
  @Output()
  addPointEvent = new EventEmitter<AppStat>();
  @Output()
  removePointEvent = new EventEmitter<AppStat>();
  @Output()
  fileChangeEvent = new EventEmitter<File>();
  @Output()
  typeChangeEvent = new EventEmitter<void>();
  @Output()
  movesChangeEvent = new EventEmitter<void>();

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

  fileChange(file: File): void {
    this.fileChangeEvent.emit(file);
  }

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.avatarSrc = reader.result as string);

      reader.readAsDataURL(file);
      this.fileChange(file);
    }
  }

  typeChange(): void {
    this.typeChangeEvent.emit();
  }

  saveMoves(move: Move): void {
    if (this.pokemon.movesIds.includes(move.id)) {
      this.pokemon.movesIds = this.pokemon.movesIds.filter((moveId) => {
        return moveId !== move.id;
      });
    } else {
      this.pokemon.movesIds.push(move.id);
      this.movesChangeEvent.emit();
    }
  }

  getTypeImage(type: ElemantaryType): string {
    switch (type) {
      case ElemantaryType.Eau:
        return '../assets/water-type.png';
      case ElemantaryType.Foudre:
        return '../assets/electric-type.png';
      case ElemantaryType.Feu:
        return '../assets/fire-type.png';
      case ElemantaryType.Neutre:
        return '../assets/neutral-type.png';
      case ElemantaryType.Air:
        return '../assets/air-type.png';
      case ElemantaryType.Terre:
        return '../assets/earth-type.png';
      default:
        return 'test';
    }
  }
}
