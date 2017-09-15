import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { OverviewContainerDispatcher } from './overview-container-dispatcher.dispatcher';
import { OverviewContainerSelector } from './overview-container-selector.selector';

@Component({
  selector: 'overview-container',
  templateUrl: './overview.container.html',
  providers: [
    OverviewContainerSelector,
    OverviewContainerDispatcher
  ]
})
export class OverviewContainer implements OnInit, OnDestroy {
  private _initialiseSubscription: Subscription;

  constructor(
    private _selector: OverviewContainerSelector,
    private _dispatcher: OverviewContainerDispatcher
  ) {}

  public ngOnInit(): void {
    this._initialiseSubscription = this._dispatcher.initialise()
      .subscribe();
  }
  public ngOnDestroy(): void {
    if (this._initialiseSubscription) {
      this._initialiseSubscription.unsubscribe();
    }
  }

}
