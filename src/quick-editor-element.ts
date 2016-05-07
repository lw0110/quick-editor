import {Input} from "angular2/core";
import {EditorMetadata} from "./editor-metadata";
import {Editable} from "./editable";
import {Control} from "angular2/common";

export class QuickEditorElement implements Editable {
    origValue:any;
    currentValue:any;
    isEditable:boolean = false;
    dataModel: any;
    
    @Input()
    metadata:EditorMetadata;
    @Input()
    id:any;
    @Input()
    formControl:Control;

    set originalValue(value:any) {
        this.origValue = value;
        this.resetValue();
    }

    resetValue() {
        this.currentValue = this.origValue;
        this.isEditable = false;
    }
    
    onEdit() {
        this.isEditable = true;
    }

    onSave() {
        this.dataModel[this.metadata.field] = this.currentValue;
        this.origValue = this.currentValue;
        this.resetValue();
    }

    isDirty() {
        return this.currentValue !== this.origValue;
    }
}