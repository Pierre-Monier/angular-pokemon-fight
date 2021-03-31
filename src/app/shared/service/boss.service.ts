import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import {Boss} from '../model/boss/boss';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Move} from "../model/move/move";
import {ElemantaryType} from "../model/elemantary-type/elemantary-type";

@Injectable({
  providedIn: 'root'
})
export class BossService {

  constructor(private db: AngularFirestore) { }

  getBosses(): Observable<Boss[]> {
    return this.db
      .collection<Boss>('/boss')
      .snapshotChanges()
      .pipe(
        map((bosses) => {
          // first we order the array by ranking, next we return a Boss for each element
          return bosses
            .sort((a, b) => {
              return a.payload.doc.data().ranking - b.payload.doc.data().ranking;
            })
            .map((bossSnapshot) => {
              const data = bossSnapshot.payload.doc.data();
              return new Boss(
                bossSnapshot.payload.doc.id,
                data.name,
                data.imageUrl,
                data.pokemonsIds,
                data.ranking
              );
            });
        })
      );
  }

  getBoss(id: string): Observable<Boss | undefined> {
    return this.db
      .doc<Boss>(`/boss/${id}`)
      .snapshotChanges()
      .pipe(
        map((bossSnapshot) => {
          const data = bossSnapshot.payload.data();
          if (data) {
            return new Boss(
              bossSnapshot.payload.id,
              data.name,
              data.imageUrl,
              data.pokemonsIds,
              data.ranking
            );
          } else {
            console.error('No move found');
            return undefined;
          }
        })
      );
  }
}
