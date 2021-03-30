import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import {Boss} from '../model/boss/boss';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

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
}
