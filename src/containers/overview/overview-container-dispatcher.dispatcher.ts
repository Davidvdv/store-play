import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

/**
 * Dispatches actions for the container
 */
@Injectable()
export class OverviewContainerDispatcher {

  /**
   * Loads all the data required for the container
   */
  public initialise(): Observable<null> {
      return Observable.of(null);
  }
}
