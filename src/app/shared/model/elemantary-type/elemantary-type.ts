export enum ElemantaryType {
  Eau = 'Eau',
  Feu = 'Feu',
  Terre = 'Terre',
  Air = 'Air',
  Foudre = 'Foudre',
  Neutre = 'Neutre',
}

export const elemantaryTypeToArray = (): string[] => {
  return Object.keys(ElemantaryType).map((item) => item.toString());
};
