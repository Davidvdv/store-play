import { STORE_EFFECTS } from '../store/index.effects';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { APP_COMPONENTS } from '../components/index';
import { APP_CONTAINERS } from '../containers/index';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,

    EffectsModule.forRoot(
      STORE_EFFECTS
    )
  ],
  declarations: [
    AppComponent,

    APP_CONTAINERS,
    APP_COMPONENTS,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
