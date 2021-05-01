import { ElemantaryType } from '../../shared/model/elemantary-type/elemantary-type';

export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

const positiveDominanceBonus = 1.7;
const negativeDominanceBonus = 0.3;

export function getElementaryTypeDominanceBonus(
  element1: ElemantaryType,
  element2: ElemantaryType
): number {
  switch (element1) {
    case ElemantaryType.Eau:
      if (element2 === ElemantaryType.Feu) {
        return positiveDominanceBonus;
      } else if (element2 === ElemantaryType.Foudre) {
        return negativeDominanceBonus;
      }
      return 1;
    case ElemantaryType.Feu:
      if (element2 === ElemantaryType.Air) {
        return positiveDominanceBonus;
      } else if (element2 === ElemantaryType.Eau) {
        return negativeDominanceBonus;
      }
      return 1;
    case ElemantaryType.Terre:
      if (element2 === ElemantaryType.Foudre) {
        return positiveDominanceBonus;
      } else if (element2 === ElemantaryType.Air) {
        return negativeDominanceBonus;
      }
      return 1;
    case ElemantaryType.Air:
      if (element2 === ElemantaryType.Terre) {
        return positiveDominanceBonus;
      } else if (element2 === ElemantaryType.Feu) {
        return negativeDominanceBonus;
      }
      return 1;
    case ElemantaryType.Foudre:
      if (element2 === ElemantaryType.Eau) {
        return positiveDominanceBonus;
      } else if (element2 === ElemantaryType.Terre) {
        return negativeDominanceBonus;
      }
      return 1;
    default:
      return 1;
  }
}
