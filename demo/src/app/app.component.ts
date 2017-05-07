import {Component} from '@angular/core';
import {EditorMetadataType} from "quick-editor";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Quick Editor Demo';
  metadataArray: any;

  editorModel: any = {
    code: 'Hello World',
    desc: 'This is a description',
    tags: ['Hello', 'World'],
    latlng: [1.3521, 103.8198]
  };

  constructor(editorMetaDataType: EditorMetadataType) {
    this.metadataArray = [{
      label: 'Short Code',
      field: 'code',
      placeholder: 'Short code used in url',
      type: editorMetaDataType.TextInput,
      required: true
    }, {
      label: 'Description',
      field: 'desc',
      placeholder: 'Page description',
      type: editorMetaDataType.TextArea
    }, {
      label: 'Tags',
      field: 'tags',
      placeholder: 'Tags to describe the place',
      type: editorMetaDataType.TagsInput
    }, {
      label: 'Map',
      field: 'latlng',
      placeholder: '',
      type: editorMetaDataType.GoogleMap
    }]
  }

  onSaveObject(model: any) {
    console.log('Saving ' + JSON.stringify(model));
  }

  onDeleteObject(model: any) {
    console.log('Deleting ' + JSON.stringify(model));
  }

}
