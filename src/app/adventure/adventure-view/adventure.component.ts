import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Boss } from '../../shared/model/boss/boss';

@Component({
  selector: 'app-adventure-view',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdventureComponent implements OnInit {
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

  isBossFightable(ranking: number): boolean {
    return (this.bossDefeatedByUser.length + 1) >= ranking;
  }
}
