import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Move} from '../../../shared/model/move/move';
import {ElemantaryType} from '../../../shared/model/elemantary-type/elemantary-type';

@Component({
  selector: 'app-move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.scss'],
})
export class MoveListComponent implements OnInit {
  @Input()
  moves!: Move[];
  @Input()
  title!: string;
  @Output()
  deleteEvent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  deleteMove(id: string): void {
    this.deleteEvent.emit(id);
  }

  getBadgeClass(type: ElemantaryType): string {
    switch (type) {
      case ElemantaryType.Eau:
        return 'eau';
      case ElemantaryType.Foudre:
        return 'foudre';
      case ElemantaryType.Feu:
        return 'feu';
      case ElemantaryType.Neutre:
        return 'neutre';
      case ElemantaryType.Air:
        return 'air';
      case ElemantaryType.Terre:
        return 'terre';
      default:
        return 'test';
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
