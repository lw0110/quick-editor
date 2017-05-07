import {NgModule} from "@angular/core";
import {QuickEditorComponent} from "./src/quick-editor.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EditorMetadataType} from "./src/editor-metadata";
import {QuickEditorInputComponent} from "./src/quick-editor-input.component";
import {QuickEditorTextAreaComponent} from "./src/quick-editor-text-area.component";
import {QuickEditorGoogleMapComponent} from "./src/quick-editor-google-map.component";
import {QuickEditorTagsInputComponent} from "./src/quick-editor-tags-input.component";

@NgModule({
    imports: [
        BrowserModule, FormsModule, ReactiveFormsModule
    ],
    declarations: [
        QuickEditorInputComponent,
        QuickEditorTextAreaComponent,
        QuickEditorGoogleMapComponent,
        QuickEditorTagsInputComponent,
        QuickEditorComponent
    ],
    entryComponents: [
        QuickEditorComponent,
        QuickEditorInputComponent,
        QuickEditorTextAreaComponent,
        QuickEditorGoogleMapComponent,
        QuickEditorTagsInputComponent
    ],
    exports: [QuickEditorComponent],
    providers: [EditorMetadataType]
})

export class QuickEditorModule {
}