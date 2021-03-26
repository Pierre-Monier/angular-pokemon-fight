import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

import {Boss, BOSS_MOCK} from '../model/boss/boss';

@Injectable({
  providedIn: 'root'
})
export class BossService {

  constructor() { }

  getBosses(): Observable<Boss[]> {
    return of(BOSS_MOCK);
  }
}
