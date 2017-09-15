import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import * as actions from './starships.actions';
import { StarshipsRepository } from './starships.repository';

/**
 * Effects of  actions
 */
@Injectable()
export class StarshipsEffects {

  /**
   * Effect of requesting Starships to be loaded.
   * Will call repository to load Starships.
   */
  @Effect()
  public loadStarships$: Observable<Action> = this.getLoadStarshipsEffect();

  constructor(private _actions$: Actions,
              private _repository: StarshipsRepository) {
  }

  private getLoadStarshipsEffect(): Observable<Action> {
    return this._actions$
      .ofType(actions.actionTypes.LOAD_STARSHIPS_REQUEST)
      .switchMap((id) =>
        this._repository.getStarships()
          .map(starships => new actions.LoadStarshipsSuccess(starships))
          .catch(() => Observable.of(new actions.LoadStarshipsFailure({error: `Oops.. Couldn't load starships`})))
      );
  }
}
