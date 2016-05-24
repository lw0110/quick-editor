#Angular 2 (rc.1) Quick Editor
[![version](https://img.shields.io/npm/v/quick-editor.svg?style=flat-square)](https://www.npmjs.com/package/quick-editor)
[![downloads](https://img.shields.io/npm/dm/quick-editor.svg?style=flat-square)](https://www.npmjs.com/package/quick-editor)
[![MIT Licence](https://img.shields.io/npm/l/quick-editor.svg?style=flat-square)](https://opensource.org/licenses/MIT)

Quick Editor is Bootstrap 3 based Angular 2 Quick Editor. This Editor suits your need if you need a simple UI editor quickly.
The editor provides Metadata way of configuration, which saves energy of writing lots UI code.

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

![quick-editor](https://cloud.githubusercontent.com/assets/10338146/15250364/06b16490-1957-11e6-9950-690d904bbba2.png)

#How To Use
Setup the quick-editor through NPM
```javascirpt
npm install quick-editor --save
```

Include the quick-editor component in systemjs.config.js
```javascript
var map = {
    'app':                        'dist', // 'dist',
    'rxjs':                       'node_modules/rxjs',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    '@angular':                   'node_modules/@angular',
    'quick-editor':               'node_modules/quick-editor'
};

var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },
    'quick-editor':               { main: 'quick-editor.js', defaultExtension: 'js' }
};
```

Before using the script, please add following library into html header before coding.
```
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="bower_components/jquery-ui/jquery-ui.min.js"></script>
<script src="http://maps.googleapis.com/maps/api/js?v=3.23&key=your_google_api_key"></script>
<script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>

<link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="bower_components/jquery-ui/themes/base/jquery-ui.min.css">
<link rel="stylesheet" href="node_modules/bootstrap-tokenfield/dist/css/bootstrap-tokenfield.min.css">
<link rel="stylesheet" href="node_modules/bootstrap-tokenfield/dist/css/tokenfield-typeahead.min.css">
```

Import the Quick Editor Classes when required
```javascript
import {QuickEditorComponent, EditorMetadata, EditorMetadataType} from "quick-editor";
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