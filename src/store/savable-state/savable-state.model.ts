/**
 * A slice of state that can be saved
 */
export interface SavableStateModel {
    isLoading: boolean;
    loadingError: string;

    isSaving: boolean;
    hasSavedSuccessfully: boolean;
    savingError: string;
}