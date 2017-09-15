import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-state/app-state.model';

/**
 * Maps application state into models the container requires
 */
@Injectable()
export class OverviewContainerSelector {
  constructor(private _store: Store<AppState>) {

  }

  /**
   * Gets whether anything the container requires is still loading
   * @returns {Observable<boolean>}
   */
  public getIsLoading(): Observable<boolean> {
    const isLoadingOne$ = Observable.of(null);
    const isLoadingTwo$ = Observable.of(null);

    return Observable.combineLatest(
      isLoadingOne$,
      isLoadingTwo$)
      .map((loading) => loading.some((isLoading) => isLoading))
      .startWith(true)
      .distinctUntilChanged();
  }

  /**
   * Gets any error that occurred while loading state the container relies on
   * @returns {Observable<string>}
   */
  public getError(): Observable<string> {
    const stateErrorOne$ = Observable.of(null);
    const stateErrorTwo$ = Observable.of(null);

    return Observable.combineLatest(
      stateErrorOne$,
      stateErrorTwo$)
      .map((errors) => errors.find((error) => !!error) || null)
      .startWith(null)
      .distinctUntilChanged();
  }
}
