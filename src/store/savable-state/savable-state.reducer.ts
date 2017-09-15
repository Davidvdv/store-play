import { SavableStateModel } from './savable-state.model';

export function getDefaultSavableStateModel(): SavableStateModel {
  return {
    isLoading: false,
    loadingError: null,
    isSaving: false,
    hasSavedSuccessfully: false,
    savingError: null
  };
}

export function saveRequest<T extends SavableStateModel>(state: T): T {
  return Object.assign({}, state, {
    isSaving: true,
    hasSavedSuccessfully: false,
    savingError: null
  });
}

export function saveSuccess<T extends SavableStateModel>(state: T): T {
  return Object.assign({}, state, {
    isSaving: false,
    hasSavedSuccessfully: true,
    savingError: null
  });
}

export function saveFailure<T extends SavableStateModel>(state: T, payload: {error: string}): T {
  return Object.assign({}, state, {
    isSaving: false,
    hasSavedSuccessfully: false,
    savingError: payload.error
  });
}
