import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-status',
  templateUrl: './add-status.component.html',
  styleUrls: ['./add-status.component.scss'],
})
export class AddStatusComponent implements OnInit {
  @Input()
  title!: string;
  @Input()
  currentNumber!: number;
  @Input()
  route!: string;
  @Input()
  max!: number;
  constructor() {}

  ngOnInit(): void {}
}
