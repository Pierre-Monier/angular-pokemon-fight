import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Weapon } from '../model/weapon/weapon';
import { WEAPONS } from '../model/weapon/mock-weapons';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {
  constructor(private messageService: MessageService) { }

  getWeapons(): Observable<Weapon[]> {
    const weapons = of(WEAPONS);
    this.messageService.add('WeaponService: fetched weapons');
    return weapons;
  }

  getWeapon(id: number): Observable<Weapon | undefined> {
    console.log("service called");
    this.messageService.add(`WeaponService: fetched weapon id=${id}`);
    return of(WEAPONS.find(weapon => weapon.id === id));
  }
}
