import { ElemantaryType } from '../elemantary-type/elemantary-type';
import { AppStat } from '../../interface/app-stat';

export interface Move {
  id: string;
  name: string;
  userUid: string;
  type: ElemantaryType;
  e: number;
  cc: number;
}

export const defaultMove: Move = {
  id: '',
  name: '',
  userUid: '',
  type: ElemantaryType.Air,
  e: 0,
  cc: 0,
};

export type MoveStat = 'e' | 'cc';

export const moveSpec = { maxPoints: 60, minPoint: 0, maxMoveNbr: 4 };

export const getMoveStatPoint = (move: Move) => move.e + move.cc;

// function to make sure that an AppStat is MoveStat
export const isMoveStat = (input: AppStat): input is MoveStat => {
  return input !== 'pv';
};
