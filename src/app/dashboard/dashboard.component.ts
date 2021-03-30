import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Boss } from '../shared/model/boss/boss';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  @Input()
  bosses!: Boss[];
  @Input()
  bossDefeatedByUser!: string[];
  constructor() {
  }

  ngOnInit(): void {
  }

  isBossDefeated(id: string): boolean {
    return this.bossDefeatedByUser.includes(id);
  }
}
