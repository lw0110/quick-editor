import {Injectable} from "@angular/core";

@Injectable()
export class EditorMetadataType {
    TextInput: string = 'TextInput';
    TextArea: string = 'TextArea';
    GoogleMap: string = 'GoogleMap';
    TagsInput: string = 'TagsInput';
}

export interface EditorMetadata {
    label: string;
    placeholder?: string;
    maxLength?: string;
    required?: boolean;
    field:string;
    type:string;
}