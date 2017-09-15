import { actionTypes, ActionWithPayload } from './starships.actions';
import { StarshipsState, StarshipsModel } from './starships.model';
import { ActionReducer, Action } from '@ngrx/store';

export function getDefaultStarshipsModel(): StarshipsState {
  return {
    isLoading: false,
    loadingError: null,
    starships: null
  };
}

/**
 * Action when  is triggered to be loaded
 * @param state
 * @param id
 * @returns {StarshipsState}
 */
function loadStarshipsRequest(state: StarshipsState): StarshipsState {
  return Object.assign({}, state, {
    isLoading: true,
    loadingError: null
  });
}

/**
 * Action when  is loaded successfully
 * @param state
 * @returns {StarshipsState}
 */
function loadStarshipsSuccess(state: StarshipsState, payload: any): StarshipsState {
  return Object.assign({}, state, {
    isLoading: false,
    loadingError: null,
    starships: payload
  });
}

/**
 * Action when  fail to load
 * @param state
 * @param error
 * @returns {StarshipsModel}
 */
function loadStarshipsFailure(state: StarshipsState, {error}): StarshipsState {
  return Object.assign({}, state, {
    isLoading: false,
    loadingError: error,
  });
}

/**
 * Main reducer
 * @param state
 * @param action
 * @returns {any}
 */
export const Reducer: ActionReducer<StarshipsState> =
  (state: StarshipsState = getDefaultStarshipsModel(), action: ActionWithPayload) => {
    switch (action.type) {
      case actionTypes.LOAD_STARSHIPS_REQUEST:
        return loadStarshipsRequest(state);
      case actionTypes.LOAD_STARSHIPS_SUCCESS:
        return loadStarshipsSuccess(state, action.payload);
      case actionTypes.LOAD_STARSHIPS_FAILURE:
        return loadStarshipsFailure(state, action.payload);
      default:
        return state;
    }
  };
