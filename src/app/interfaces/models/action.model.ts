import { Action } from '@ngrx/store';

export interface ActionModel extends Action {
  type: string;
  payload: any;
}
