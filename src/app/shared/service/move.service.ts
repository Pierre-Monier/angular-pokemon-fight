import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from '../../message/service/message.service';
import { Move } from '../model/move/move';
import { MOVES } from '../model/move/mock-moves';

@Injectable({
  providedIn: 'root'
})
export class MoveService {
  constructor(private messageService: MessageService) { }

  getMoves(): Observable<Move[]> {
    const moves = of(MOVES);
    this.messageService.add('MoveService: fetched moves');
    return moves;
  }

  getMove(id: number): Observable<Move | undefined> {
    this.messageService.add(`MoveService: fetched move id=${id}`);
    return of(MOVES.find(weapon => weapon.id === id));
  }
}
