import { Component, Input, OnInit } from '@angular/core';
import { Move } from '../../model/move/move';

@Component({
  selector: 'app-move-selector',
  templateUrl: './move-selector.component.html',
  styleUrls: ['./move-selector.component.css'],
})
export class MoveSelectorComponent implements OnInit {
  @Input()
  moves!: Move[];
  @Input()
  current!: Move[];
  constructor() {}

  ngOnInit(): void {}
}
