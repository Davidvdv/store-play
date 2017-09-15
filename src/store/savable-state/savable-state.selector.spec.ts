import { SavableStateModel } from './savable-state.model';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { SavableStateSelector } from './savable-state.selector';


describe('SavableStateSelector', () => {
  let sut: TestableSavableStateSelector;

  beforeEach(() => {
    sut = new TestableSavableStateSelector();
  });

  describe('getIsLoading', () => {
    it('should be true when loading', (done) => {
      sut.modelReplay.next({ isLoading: true } as SavableStateModel);
      sut.modelReplay.complete();

      sut.getIsLoading()
        .finally(done)
        .last()
        .subscribe(isLoading => expect(isLoading).toBe(true));
    });

    it(`should not emit when is loading value doesn't change`, (done) => {
      sut.modelReplay.next({ isLoading: true } as SavableStateModel);
      sut.modelReplay.next({ isLoading: true } as SavableStateModel);
      sut.modelReplay.complete();

      sut.getIsLoading()
        .finally(done)
        .count()
        .last()
        .subscribe(numberOfEmissions => expect(numberOfEmissions).toBe(1));
    });

    it(`should emit when is loading value changes`, (done) => {
      sut.modelReplay.next({ isLoading: true } as SavableStateModel);
      sut.modelReplay.next({ isLoading: false } as SavableStateModel);
      sut.modelReplay.next({ isLoading: true } as SavableStateModel);
      sut.modelReplay.complete();

      sut.getIsLoading()
        .finally(done)
        .count()
        .last()
        .subscribe(numberOfEmissions => expect(numberOfEmissions).toBe(3));
    });
  });

  describe('getIsSaving', () => {
    it('should be true when saving', (done) => {
      sut.modelReplay.next({ isSaving: true } as SavableStateModel);
      sut.modelReplay.complete();

      sut.getIsSaving()
        .finally(done)
        .last()
        .subscribe(isSaving => expect(isSaving).toBe(true));
    });

    it(`should not emit when is saving value doesn't change`, (done) => {
      sut.modelReplay.next({ isSaving: true } as SavableStateModel);
      sut.modelReplay.next({ isSaving: true } as SavableStateModel);
      sut.modelReplay.complete();

      sut.getIsSaving()
        .finally(done)
        .count()
        .last()
        .subscribe(numberOfEmissions => expect(numberOfEmissions).toBe(1));
    });

    it(`should emit when is saving value changes`, (done) => {
      sut.modelReplay.next({ isSaving: true } as SavableStateModel);
      sut.modelReplay.next({ isSaving: false } as SavableStateModel);
      sut.modelReplay.next({ isSaving: true } as SavableStateModel);
      sut.modelReplay.complete();

      sut.getIsSaving()
        .finally(done)
        .count()
        .last()
        .subscribe(numberOfEmissions => expect(numberOfEmissions).toBe(3));
    });
  });

  describe('getError', () => {
    it('should return loading error', (done) => {
      const expectedError = 'ERROR';
      sut.modelReplay.next({ loadingError: expectedError } as SavableStateModel);
      sut.modelReplay.complete();

      sut.getError()
        .finally(done)
        .last()
        .subscribe(error => expect(error).toBe(expectedError));
    });

    it('should return saving error', (done) => {
      const expectedError = 'ERROR';
      sut.modelReplay.next({ savingError: expectedError } as SavableStateModel);
      sut.modelReplay.complete();

      sut.getError()
        .finally(done)
        .last()
        .subscribe(error => expect(error).toBe(expectedError));
    });

    it(`should not emit when is error value doesn't change`, (done) => {
      sut.modelReplay.next({ loadingError: 'ERROR' } as SavableStateModel);
      sut.modelReplay.next({ loadingError: 'ERROR' } as SavableStateModel);
      sut.modelReplay.complete();

      sut.getError()
        .finally(done)
        .count()
        .last()
        .subscribe(numberOfEmissions => expect(numberOfEmissions).toBe(1));
    });

    it(`should emit when is error value changes`, (done) => {
      sut.modelReplay.next({} as SavableStateModel);
      sut.modelReplay.next({ loadingError: 'ERROR' } as SavableStateModel);
      sut.modelReplay.next({} as SavableStateModel);
      sut.modelReplay.complete();

      sut.getError()
        .finally(done)
        .count()
        .last()
        .subscribe(numberOfEmissions => expect(numberOfEmissions).toBe(3));
    });
  });
});


class TestableSavableStateSelector extends SavableStateSelector<SavableStateModel> {

  public modelReplay: ReplaySubject<SavableStateModel>;

  constructor() {
    super();

    this.modelReplay = new ReplaySubject();
  }

  public getModel(): Observable<SavableStateModel> {
    return this.modelReplay.asObservable();
  }
}