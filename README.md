#Angular 4 (4.1.1) Quick Editor
[![version](https://img.shields.io/npm/v/quick-editor.svg?style=flat-square)](https://www.npmjs.com/package/quick-editor)
[![downloads](https://img.shields.io/npm/dm/quick-editor.svg?style=flat-square)](https://www.npmjs.com/package/quick-editor)
[![MIT Licence](https://img.shields.io/npm/l/quick-editor.svg?style=flat-square)](https://opensource.org/licenses/MIT)

Quick Editor is Bootstrap 3 based Angular 4 Quick Editor. This Editor suits your need if you need a simple UI editor quickly.
The editor provides Metadata way of configuration, which saves energy of writing lots UI code.
The project has been updated to use typescript declaration files in node_modules/@type, if there is any pre installed global typings files, please uninstall.

Currently, the editor supports 4 types of input,

* Input
* TextArea
* Google Map
* Tags (integrated from http://sliptree.github.io/bootstrap-tokenfield/)

More types of inputs will be added soon.

#Feature
* onSave onDelete event binder
* UI Read-Only Mode
* Dirty field indicator
* Data reset after cancel edit
* Save Cancel Edit and Delete buttons with icon are provided
* Google Map Edit with draggble marker and geocode search

![quick-editor](https://cloud.githubusercontent.com/assets/10338146/15510393/a6c9b684-2209-11e6-8b90-fcea5c52c051.png)

#How To Use
Setup the quick-editor through NPM
```javascirpt
npm install quick-editor --save
```

Before using the script, please add following library into .angular-cli.json
```
 "styles": [
        "../node_modules/jquery-ui-dist/jquery-ui.min.css",
        "../node_modules/bootstrap/dist/css/bootstrap.min.css",
        "../node_modules/bootstrap-tokenfield/dist/css/bootstrap-tokenfield.min.css",
        "../node_modules/bootstrap-tokenfield/dist/css/tokenfield-typeahead.min.css"
      ],
      "scripts": [
        "../node_modules/jquery/dist/jquery.min.js",
        "../node_modules/jquery-ui-dist/jquery-ui.min.js",
        "../node_modules/bootstrap/dist/js/bootstrap.min.js",
        "../node_modules/bootstrap-tokenfield/dist/bootstrap-tokenfield.min.js"
      ],
```

Import the Quick Editor Classes when required
```javascript
import {
    QuickEditorModule,
    QuickEditorInputComponent,
    QuickEditorComponent,
    QuickEditorTextAreaComponent,
    QuickEditorGoogleMapComponent,
    QuickEditorTagsInputComponent
} from "quick-editor";


@NgModule({
    imports: [
        BrowserModule, 
        FormsModule, 
        ReactiveFormsModule,
        QuickEditorModule,
        ...],
    declarations: [...],
    entryComponents: [
        QuickEditorComponent,
        QuickEditorInputComponent,
        QuickEditorTextAreaComponent,
        QuickEditorGoogleMapComponent,
        QuickEditorTagsInputComponent],
    bootstrap: [AppComponent],
})

export class AppModule {
}

```

The field name in EditorMetadata should be same as property name in data model.
Location attribute should be a tuple type with 2 number element, represents latitude and longitude. Tags attribute should be an array.

```javascript
export interface Place {
    id: number,
    name: string,
    address: string,
    latlng:[number, number],
    desc: string,
    distance: number,
    tags: string[]
}

@Component({
    template: `
    <div class="panel panel-default" *ngFor="let place of places;">
    <div class="panel-body">
        <quick-editor [metadataArray]="metadataArray" [dataModel]="place"
             (onSave)="onSavePlace($event)"></quick-editor>
    </div>
    </div>
    `,
    directives: [QuickEditorComponent]
})

export class PageEditComponent implements OnInit {
    places:Place[];

    metadataArray:EditorMetadata[] = [<EditorMetadata> {
        label: 'Name',
        field: 'name',
        placeholder: 'Please input place name',
        type: EditorMetadataType.TextInput
    }, {
        label: 'Description',
        field: 'desc',
        placeholder: 'Please input some description',
        type: EditorMetadataType.TextArea
    }, {
        label: 'Address',
        field: 'address',
        placeholder: 'Please input place name',
        type: EditorMetadataType.TextInput
    }, {
        label: 'Map',
        field: 'latlng',
        placeholder: '',
        type: EditorMetadataType.GoogleMap
    }, {
       label: 'Tags',
       field: 'tags',
       placeholder: 'Tags to describe the place',
       type: EditorMetadataType.TagsInput
    }];
...}
```