import { ElemantaryType } from '../elemantary-type/elemantary-type';
import { AppStat } from '../../interface/app-stat';

export class Move {
  id: string;
  name: string;
  userUid: string;
  type: ElemantaryType;
  damage: number;
  e: number;
  cc: number;

  static getDefaultMove(): Move {
    return new Move('', '', '', ElemantaryType.Air, 0, 0, 0);
  }

  constructor(
    id: string,
    name: string,
    userUid: string,
    type: ElemantaryType,
    damage: number,
    e: number,
    cc: number
  ) {
    this.id = id;
    this.name = name;
    this.userUid = userUid;
    this.type = type;
    this.damage = damage;
    this.e = e;
    this.cc = cc;
  }

  getStatPoint(): number {
    return this.e + this.cc + this.damage;
  }
}

export type MoveStat = 'damage' | 'e' | 'cc';

export const moveSpec = { maxPoints: 60, minPoint: 0, maxMoveNbr: 12 };

// function to make sure that an AppStat is MoveStat
export const isMoveStat = (input: AppStat): input is MoveStat => {
  return input !== 'pv';
};
