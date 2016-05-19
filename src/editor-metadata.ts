export class EditorMetadataType {
    static TextInput = 'TextInput';
    static TextArea = 'TextArea';
    static GoogleMap = 'GoogleMap';
    static TagsInput = 'TagsInput';
}

export interface EditorMetadata {
    label: string;
    placeholder?: string;
    maxLength?: string;
    required?: boolean;
    field:string;
    type:string;
}