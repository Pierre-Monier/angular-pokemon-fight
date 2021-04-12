import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-types-selector',
  templateUrl: './types-selector.component.html',
  styleUrls: ['./types-selector.component.scss'],
})
export class TypesSelectorComponent implements OnInit {
  @Input()
  types!: string[];
  @Input()
  current!: string;
  constructor() {}

  ngOnInit(): void {}
}
