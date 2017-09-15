import { EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

/**
 * Provides some common form component functionality
 * Emits event whenever the model changes due to user interaction (and handles multiselect mapping from selected value to selected object)
 * Emits event whenever the model's form group changes validation status
 * 
 * Handles subscribing and unsubscribing within the angular lifecycle hooks
 */
export abstract class BaseFormComponent<T> implements OnInit, OnDestroy, OnChanges {

    /**
     * The model
     */
    @Input() model: T;

    /**
     * Has there been an attempt to submit?
     */
    @Input() attemptedToSubmit: boolean;

    /**
     * Emits anytime a property on the form changes validity
     */
    @Output() statusChanged = new EventEmitter<any>();

    /**
     * Emits anytime the model is changed
     */
    @Output() modelChanged = new EventEmitter<T>();

    public formGroup: FormGroup;
    protected _subscriptions: Subscription[] = [];

    public ngOnInit(): void {

        const valuesChangesSubscription = this.formGroup.valueChanges
            .debounceTime(200)
            .subscribe((values) => this.emitModel(values));

        // TODO: distinct until changed isn't working out too good here
        const statusChangesSubscription = this.formGroup.statusChanges
            .debounceTime(200)
            .map(() => this.formGroup.controls)
            .map(controls => Object.keys(controls)
                .map(key => ({ [key]: controls[key].status !== 'INVALID' }))
                .reduce((model, status) => Object.assign({}, model, status), {})
            )
            .distinctUntilChanged()
            .subscribe(statuses => this.statusChanged.emit(statuses));

        this.formGroup.updateValueAndValidity();

        this._subscriptions.push(valuesChangesSubscription, statusChangesSubscription);
    }

    /**
     * Unsubscribe to all subscriptions
     */
    ngOnDestroy() {
        this._subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        const triedToSubmit = changes['attemptedToSubmit'] && changes['attemptedToSubmit'].currentValue;

        if (triedToSubmit) {
            this.formGroup.markAsTouched();
        }
    }

    private emitModel(values) {
        // Because multiselect sets the value as a selection option, we need to pull out the underlying value of the selection option
        const multiSelectValues = Object.keys(values)
            .filter((key) => this.isSelectionItem(values[key]))
            .map((key) => ({ [key]: values[key].value }))
            .reduce((obj, properValue) => Object.assign({}, obj, properValue), {});

        const model = Object.assign({}, values, multiSelectValues);

        this.modelChanged.emit(model);
    }

    private isSelectionItem(item): boolean {
        return item && item.value;
    }

    protected findMatchingOption(value: any, options: SelectionOption[]): SelectionOption {
        return options.find((option) => option.value === value);
    }
}

export interface SelectionOption {
  name: string;
  value: string;
}

export interface DisplayOptions {
  showValidation: boolean;
  disableInputs: boolean;
}


