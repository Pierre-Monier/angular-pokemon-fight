import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Move } from '../../../shared/model/move/move';

@Component({
  selector: 'app-move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.css'],
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
}
