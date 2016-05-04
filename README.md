#Quick Editor
Quick Editor is Bootstrap 3 based Angular 2 Quick Editor. This Editor suits your need if you need a simple UI editor quickly.
The editor provides Metadata way of configuration, which saves energy of writing lots UI code.

Currently, the editor supports 3 types of input,

* Input
* TextArea
* Google Map

More types of inputs will be added soon.

#Feature
* onSave onDelete event binder
* UI Read-Only Mode
* Dirty field indicator
* Data reset after cancel edit

#How To Use
Before using the script, please add following library into html header before coding
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.js"></script>
<script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="http://maps.googleapis.com/maps/api/js?v=3.23&key=your_google_api_key"></script>
<link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
```

The field name in EditorMetadata should be same as property name in data model.

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
    }];
...}
```