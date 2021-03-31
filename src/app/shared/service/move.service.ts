import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Move } from '../model/move/move';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { ElemantaryType } from '../model/elemantary-type/elemantary-type';
import { FormMode } from '../interface/form';
import firebase from 'firebase';
import DocumentReference = firebase.firestore.DocumentReference;
import {AppUserService} from './app-user.service';

@Injectable({
  providedIn: 'root',
})
export class MoveService {
  constructor(private appUser: AppUserService, private db: AngularFirestore) {}

  getMoves(ids?: string[]): Observable<Move[]> {
    return this.db
      .collection<Move>('/move')
      .snapshotChanges()
      .pipe(
        map((moves) => {
          const areIds = (id: string) => (ids ? ids.includes(id) : true);
          const currentUser = this.appUser.getCurrentAppUser();
          return moves
            .filter(
              (movesSnapshot) =>
                currentUser &&
                movesSnapshot.payload.doc.data().userUid ===
                currentUser?.uid &&
                areIds(movesSnapshot.payload.doc.id)
            )
            .map((movesSnapshot) => {
              return new Move(
                movesSnapshot.payload.doc.id,
                movesSnapshot.payload.doc.data().name,
                movesSnapshot.payload.doc.data().userUid,
                ElemantaryType[movesSnapshot.payload.doc.data().type],
                movesSnapshot.payload.doc.data().damage,
                movesSnapshot.payload.doc.data().e,
                movesSnapshot.payload.doc.data().cc
              );
            });
        })
      );
  }

  getMove(id: string): Observable<Move | undefined> {
    return this.db
      .doc<Move>(`/move/${id}`)
      .snapshotChanges()
      .pipe(
        map((moveSnapshot) => {
          const data = moveSnapshot.payload.data();
          if (data) {
            return new Move(
              moveSnapshot.payload.id,
              data.name,
              data.userUid,
              ElemantaryType[data.type],
              data.damage,
              data.e,
              data.cc
            );
          } else {
            console.error('No move found');
            return undefined;
          }
        })
      );
  }

  private updateMove(move: Move): Promise<void> {
    return this.db
      .doc<Move>(`/move/${move.id}`)
      .update(Object.assign({}, move))
      .catch((error) => console.error(error));
  }

  private addMove(
    move: Move,
    userUid: string
  ): Promise<DocumentReference<Move>> {
    move.userUid = userUid;
    return this.db.collection<Move>('/move').add(Object.assign({}, move));
  }

  submitMove(
    type: FormMode,
    move: Move
  ): Promise<DocumentReference<Move> | void> {
    const currentUser = this.appUser.getCurrentAppUser();
    const userUid = currentUser
      ? currentUser.uid
      : 'unknown';

    if (type === 'create') {
      return this.addMove(move, userUid);
    } else {
      return this.updateMove(move);
    }
  }

  deleteMove(id: string): void {
    this.db
      .doc<Move>(`/move/${id}`)
      .delete()
      .catch((error) => console.error(error));
  }
}
