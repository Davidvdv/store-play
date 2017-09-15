import { Store } from '@ngrx/store';
import { AppState } from '../../../../app/app.model';
import { TestBed } from '@angular/core/testing';
import { OverviewContainerDispatcher } from "./overview-container-dispatcher.dispatcher";

describe('OverviewContainerDispatcher', () => {
  let sut: OverviewContainerDispatcher;

  let store: Store<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OverviewContainerDispatcher,
        {provide: Store, useValue: {}},
      ]
    });

    sut = TestBed.get(OverviewContainerDispatcher);

    store = TestBed.get(Store);
  });

  it('should exist', () => {
    expect(sut).toBeTruthy();
  });

  describe('initialise', () => {
    beforeEach(() => {
      store.dispatch = jasmine.createSpy('dispatch');
    });
  });
});
