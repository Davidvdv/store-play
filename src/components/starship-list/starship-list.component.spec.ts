import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { StarshipListComponent } from './starship-list.component';

describe('StarshipListComponent', () => {
  let sut: StarshipListComponent;
  let fixture: ComponentFixture<StarshipListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        StarshipListComponent
      ],
    });

    fixture = TestBed.createComponent(StarshipListComponent);
    sut = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(sut).toBeTruthy();
  });
});
