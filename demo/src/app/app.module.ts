import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {
  QuickEditorComponent, QuickEditorGoogleMapComponent, QuickEditorInputComponent, QuickEditorModule,
  QuickEditorTagsInputComponent,
  QuickEditorTextAreaComponent
} from "quick-editor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    QuickEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    QuickEditorComponent,
    QuickEditorInputComponent,
    QuickEditorTextAreaComponent,
    QuickEditorGoogleMapComponent,
    QuickEditorTagsInputComponent]
})
export class AppModule {
}
