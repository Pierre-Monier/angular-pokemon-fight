import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  // with onPush ChangeDetectionStrategy, all class attribute should be immutable
  // if we have an attribute toto = { test: true }, we should update toto like this : this.toto = { test: false }
  constructor() { }

  ngOnInit(): void{
  }
}
