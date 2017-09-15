import { StarshipsModel } from './starships.model';
import { Action } from '@ngrx/store';
import { actionType } from '../action-type.util';

export const actionTypes = {
  LOAD_STARSHIPS_REQUEST: actionType('[Starships] Load'),
  LOAD_STARSHIPS_SUCCESS: actionType('[Starships] Load Success'),
  LOAD_STARSHIPS_FAILURE: actionType('[Starships] Load Failure'),
};

export interface ActionWithPayload extends Action {
  payload?: any;
}

/**
 * Action requesting Starships to be loaded
 */
export class LoadStarshipsRequest implements ActionWithPayload {
  type = actionTypes.LOAD_STARSHIPS_REQUEST;
}

/**
 * Action for when Starships have been successfully retrieved
 */
export class LoadStarshipsSuccess implements ActionWithPayload {
  type = actionTypes.LOAD_STARSHIPS_SUCCESS;

  constructor(public payload: StarshipsModel[]) {
  }
}

/**
 * Action for when retrieval of Starships has failed
 */
export class LoadStarshipsFailure implements ActionWithPayload {
  type = actionTypes.LOAD_STARSHIPS_FAILURE;

  constructor(public payload: {error: string}) {
  }
}

/**
 * Actions for Starships
 */
export type Actions
  = LoadStarshipsRequest
  | LoadStarshipsSuccess
  | LoadStarshipsFailure;
