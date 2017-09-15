import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { getElement } from '../../../../services/common/unit-tests/input.util';
import { OverviewContainer } from "./overview.container";
import { OverviewContainerDispatcher } from "./overview-container-dispatcher.dispatcher";
import { OverviewContainerSelector } from "./overview-container-selector.selector";

describe('OverviewContainer', () => {
  let sut: OverviewContainer;
  let fixture: ComponentFixture<OverviewContainer>;

  let dispatcher: OverviewContainerDispatcher;
  let selector: OverviewContainerSelector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        OverviewContainer
      ]
    }).overrideComponent(OverviewContainer, {
      set: {
        providers: [
          {provide: OverviewContainerDispatcher, useValue: {}},
          {provide: OverviewContainerSelector, useValue: {}},
        ]
      }
    });

    fixture = TestBed.createComponent(OverviewContainer);

    sut = fixture.componentInstance;

    dispatcher = fixture.debugElement.injector.get(OverviewContainerDispatcher);
    selector = fixture.debugElement.injector.get(OverviewContainerSelector);

    dispatcher.initialise = jasmine.createSpy('initialise')
      .and.returnValue(Observable.of(null));

    selector.getIsLoading = jasmine.createSpy('getIsLoading')
      .and.returnValue(Observable.of(null));

    selector.getError = jasmine.createSpy('getError')
      .and.returnValue(Observable.of(null));

    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(sut).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialise dispatching', () => {
      expect(dispatcher.initialise).toHaveBeenCalled();
    });

    it('should listen to errors', () => {
      expect(selector.getError).toHaveBeenCalled();
    });

    it('should listen to loading', () => {
      expect(selector.getIsLoading).toHaveBeenCalled();
    });
  });

  describe('Error states', () => {
    const error$ = new ReplaySubject<string>();

    beforeEach(() => {
      selector.getError = jasmine.createSpy('getError')
        .and.returnValue(error$);

      sut.ngOnInit();
    });

    it('should display error message when there is an error', () => {
      error$.next('ERROR');

      fixture.detectChanges();

      const element = getElement(fixture.debugElement, '.error-container');
      expect(element).toBeTruthy();
    });

    it('should not display main content when there is an error', () => {
      error$.next('ERROR');

      fixture.detectChanges();

      const element = getElement(fixture.debugElement, '.content-container');
      expect(element).toBeNull();
    });

    it('should not display error message when there is no error', () => {
      error$.next(null);

      fixture.detectChanges();

      const element = getElement(fixture.debugElement, '.error-container');
      expect(element).toBeNull();
    });

    it('should display main content when there is no error', () => {
      error$.next(null);

      fixture.detectChanges();

      const element = getElement(fixture.debugElement, '.content-container');
      expect(element).toBeTruthy();
    });
  });

  describe('Loading states', () => {
    const loading$ = new ReplaySubject<boolean>();

    beforeEach(() => {
      selector.getIsLoading = jasmine.createSpy('getIsLoading')
        .and.returnValue(loading$);

      sut.ngOnInit();
    });

    it('should display the loading icon when the resources are still loading', () => {
      loading$.next(true);

      fixture.detectChanges();

      const element = getElement(fixture.debugElement, 'bloader');
      expect(element).toBeTruthy();
    });

    it('should hide the loading icon when the resources finished loading', () => {
      loading$.next(false);

      fixture.detectChanges();

      const element = getElement(fixture.debugElement, 'bloader');
      expect(element).toBeFalsy();

    });

    it('should show the main content when the resources finished loading', () => {
      loading$.next(false);

      fixture.detectChanges();

      const element = getElement(fixture.debugElement, '.content-container');
      expect(element).toBeTruthy();
    });
  });

});
