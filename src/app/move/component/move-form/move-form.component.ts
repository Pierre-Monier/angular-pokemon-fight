import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormMode } from '../../../shared/domain/form/form';
import { Move, MoveStat } from '../../../shared/model/move/move';

@Component({
  selector: 'app-move-form',
  templateUrl: './move-form.component.html',
  styleUrls: ['./move-form.component.css'],
})
export class MoveFormComponent implements OnInit {
  @Input()
  move!: Move;
  @Input()
  types!: string[];
  @Input()
  points!: number;
  @Output()
  submitEvent = new EventEmitter<Move>();
  @Output()
  goBackEvent = new EventEmitter<void>();
  @Output()
  addPointEvent = new EventEmitter<MoveStat>();
  @Output()
  removePointEvent = new EventEmitter<MoveStat>();
  constructor() {}

  ngOnInit(): void {}

  submit(move: Move): void {
    this.submitEvent.emit(move);
  }

  goBack(): void {
    this.goBackEvent.emit();
  }

  addPoint<T>(property: T): void {
    this.addPointEvent.emit(property);
  }

  removePoint(property: MoveStat): void {
    this.removePointEvent.emit(property);
  }
}
