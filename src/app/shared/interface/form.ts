import {AppStat} from './app-stat';

export interface FormContainer {
  submit: (entity: any) => void;
  updatePoints: () => void;
  addPoint: (property: AppStat) => void;
  removePoint: (property: AppStat) => void;
  goBack: () => void;
}

export type FormMode = 'create' | 'update';
