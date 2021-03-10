import { ElemantaryType } from '../elemantary-type/elemantary-type';

export interface Pokemon {
    id: string;
    name: string;
    userUid: string;
    type: ElemantaryType;
    pv: number;
    e: number;
    cc: number;
}
