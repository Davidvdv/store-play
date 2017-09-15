import { SavableStateModel } from './savable-state.model';
import { Observable } from 'rxjs/Rx';

/**
 * Provides mappings from savable slices of state
 */
export abstract class SavableStateSelector<T extends SavableStateModel> {
  abstract getModel(): Observable<T>;

  /**
   * Is the slice of state loading?
   */
  public getIsLoading(): Observable<boolean> {
    return this.getModel()
      .map(model => model.isLoading)
      .distinctUntilChanged();
  }

  /**
   * Is the slice of state saving?
   */
  public getIsSaving(): Observable<boolean> {
    return this.getModel()
      .map(model => model.isSaving)
      .distinctUntilChanged();
  }

  /**
   * Has the slice of state saved successfully?
   */
  public getHasSavedSuccessfully(): Observable<boolean> {
    return this.getModel()
      .map(model => model.hasSavedSuccessfully)
      .distinctUntilChanged();
  }

  /**
   * Gets any errors associated to the slice of state
   */
  public getError(): Observable<string> {
    return this.getModel()
      .map(model => model.loadingError || model.savingError)
      .distinctUntilChanged();
  }
}
