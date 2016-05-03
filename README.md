#Quick Editor
Quick Editor is Bootstrap 3 based Angular 2 Quick Editor. This Editor suits your need if you need a simple UI editor quickly.
The editor provides Metadata way of configuration, which saves energy of writing lots UI code.
Currently, the editor supports 3 types of input,
..*Input
..*TextArea
..*Google Map
More types of inputs will be added soon.
#How To Use
```javascript
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