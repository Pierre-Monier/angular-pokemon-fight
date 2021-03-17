import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Move } from '../../../shared/model/move/move';
import { AppStat } from '../../../shared/interface/app-stat';

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
  addPointEvent = new EventEmitter<AppStat>();
  @Output()
  removePointEvent = new EventEmitter<AppStat>();
  constructor() {}

  ngOnInit(): void {}

  submit(move: Move): void {
    this.submitEvent.emit(move);
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
