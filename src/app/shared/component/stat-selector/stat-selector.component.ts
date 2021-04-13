import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppStat } from '../../interface/app-stat';

@Component({
  selector: 'app-stat-selector',
  templateUrl: './stat-selector.component.html',
  styleUrls: ['./stat-selector.component.scss'],
})
export class StatSelectorComponent implements OnInit {
  @Input()
  max!: number;
  @Input()
  min!: number;
  @Input()
  current!: number;
  @Input()
  property!: AppStat;
  @Output()
  addPointEvent = new EventEmitter<AppStat>();
  @Output()
  removePointEvent = new EventEmitter<AppStat>();

  constructor() {}

  ngOnInit(): void {}

  addPoint(): void {
    this.addPointEvent.emit(this.property);
  }

  removePoint(): void {
    this.removePointEvent.emit(this.property);
  }
}
