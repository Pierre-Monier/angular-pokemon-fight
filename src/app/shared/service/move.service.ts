import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from './message.service';
import { Move } from '../model/move/move';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { ElemantaryType } from '../model/elemantary-type/elemantary-type';
import { FormMode } from '../interface/form';

@Injectable({
  providedIn: 'root',
})
export class MoveService {
  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private db: AngularFirestore
  ) {}

  getMoves(ids?: string[]): Observable<Move[]> {
    this.messageService.add('MoveService: fetching moves');
    return this.db
      .collection<Move>('/move')
      .snapshotChanges()
      .pipe(
        map((moves) => {
          const areIds = (id: string) => (ids ? ids.includes(id) : true);
          return moves
            .filter(
              (movesSnapshot) =>
                this.authService.userData &&
                movesSnapshot.payload.doc.data().userUid ===
                  this.authService.userData?.uid &&
                areIds(movesSnapshot.payload.doc.id)
            )
            .map((movesSnapshot) => {
              return {
                id: movesSnapshot.payload.doc.id,
                name: movesSnapshot.payload.doc.data().name,
                userUid: movesSnapshot.payload.doc.data().userUid,
                type: ElemantaryType[movesSnapshot.payload.doc.data().type],
                e: movesSnapshot.payload.doc.data().e,
                cc: movesSnapshot.payload.doc.data().cc,
              };
            });
        })
      );
  }

  getMove(id: string): Observable<Move | undefined> {
    this.messageService.add(`MoveService: fetched move id=${id}`);
    return this.db
      .doc<Move>(`/move/${id}`)
      .snapshotChanges()
      .pipe(
        map((moveSnapshot) => {
          const data = moveSnapshot.payload.data();
          if (data) {
            return {
              id: moveSnapshot.payload.id,
              name: data.name,
              userUid: data.userUid,
              type: ElemantaryType[data.type],
              e: data.e,
              cc: data.cc,
            };
          } else {
            console.error('No move found');
            return undefined;
          }
        })
      );
  }

  private updateMove(move: Move): void {
    this.db
      .doc<Move>(`/move/${move.id}`)
      .update(move)
      .then(() => this.messageService.add('pokemon updated'))
      .catch((error) => console.error(error));
  }

  private addMove(move: Move): void {
    if (this.authService.userData) {
      move.userUid = this.authService.userData.uid;
      this.db.collection<Move>('/move').add(move);
    } else {
      console.error(
        'trying to add pokemon in collection but no user authenticated'
      );
    }
  }

  submitMove(type: FormMode, move: Move): void {
    if (type === 'create') {
      this.addMove(move);
    } else {
      this.updateMove(move);
    }
  }

  deleteMove(id: string): void {
    this.db
      .doc<Move>(`/move/${id}`)
      .delete()
      .then(() => this.messageService.add('move deleted'))
      .catch((error) => console.error(error));
  }
}
