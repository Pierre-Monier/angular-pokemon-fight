import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-dialog',
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.scss'],
})
export class GameDialogComponent implements OnInit {
  @Input()
  dialogContent!: string;
  constructor() {}

  ngOnInit(): void {}
}
