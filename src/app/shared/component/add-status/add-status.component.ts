import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-status',
  templateUrl: './add-status.component.html',
  styleUrls: ['./add-status.component.css'],
})
export class AddStatusComponent implements OnInit {
  @Input()
  currentNumber!: number;
  @Input()
  route!: string;
  @Input()
  max!: number;
  constructor() {}

  ngOnInit(): void {}
}
