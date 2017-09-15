import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { getLastCallArgument } from '../../testing/spy-test-utils.spec';
import { BaseFormComponent } from './base-form-component';

describe('BaseFormComponent', () => {
    let sut: TestBaseFormComponent;
    let fixture: ComponentFixture<TestBaseFormComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
            ],
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                TestBaseFormComponent
            ],
        });

        fixture = TestBed.createComponent(TestBaseFormComponent);
        sut = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should exist', () => {
        expect(sut).toBeTruthy();
    });

    describe('modelChanged', () => {
        beforeEach(() => {
            sut.modelChanged.emit = jasmine.createSpy('modelChanged');
        });

        it('should emit an event when the the a form control changes', (done) => {
            const expectedName = 'aaa';
            sut.formGroup.get('name').setValue(expectedName);

            fixture.detectChanges();

            Observable.of(null).delay(250)
                .subscribe(() => {
                    expect(sut.modelChanged.emit).toHaveBeenCalled();
                    const model = getLastCallArgument<TestModel>(sut.modelChanged.emit, 0);
                    expect(model.name).toBe(expectedName);
                    done();
                });

        });
    });

    describe('statusChanged', () => {
        beforeEach(() => {
            sut.statusChanged.emit = jasmine.createSpy('statusChanged');
        });

        it('should emit an event after initialisation', (done) => {
            sut.ngOnInit();

            fixture.detectChanges();

            Observable.of(null).delay(200)
                .subscribe(() => {
                    expect(sut.statusChanged.emit).toHaveBeenCalled();
                    done();
                });
        });
    });

    describe('displayOptions', () => {
        describe('disableInputs', () => {
            beforeEach(() => {
                sut.displayOptions.disableInputs = true;
                sut.ngOnInit();
            });

            it('should set all form controls to disabled', () => {
                expect(sut.formGroup.get('name').disabled).toBe(true);
            });
        });
    });
});

@Component({
    selector: 'test-base-form-component',
    template: ''
})
class TestBaseFormComponent extends BaseFormComponent<TestModel> {
    constructor(private formBuilder: FormBuilder) {
        super();
    }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            name: []
        });
        super.ngOnInit();
    }
}

interface TestModel {
    name: string;
}
