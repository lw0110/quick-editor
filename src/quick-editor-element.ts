import {Input} from "@angular/core";
import {EditorMetadata} from "./editor-metadata";
import {Editable} from "./editable";
import {Control} from "@angular/common";
import {isArray} from "rxjs/util/isArray";

export class QuickEditorElement implements Editable {
    origValue:any;
    currentValue:any;
    isEditable:boolean = false;
    dataModel:any;

    @Input()
    metadata:EditorMetadata;
    @Input()
    id:any;
    @Input()
    formControl:Control;

    set originalValue(value:any) {
        this.origValue = isArray(value) ? value.slice(0) : value;
        this.resetValue();
    }

    resetValue() {
        this.currentValue = isArray(this.origValue) ? this.origValue.slice(0) : this.origValue;
        this.isEditable = false;
    }

    onEdit() {
        this.isEditable = true;
    }

    onSave() {
        this.dataModel[this.metadata.field] = this.currentValue;
        this.origValue = isArray(this.currentValue) ? this.currentValue.slice(0) : this.currentValue;
        this.resetValue();
    }

    isDirty() {
        if (isArray(this.currentValue)) {
            return !this.eqArray(this.currentValue, this.origValue);
        } else {
            return this.currentValue !== this.origValue;
        }
    }

    eqArray(a:Array<any>, b:Array<any>):boolean {
        if (a.length != b.length) {
            return false;
        } else {
            let alen = a.length;
            for (let i:number = 0; i < alen; i++) {
                if (a[i] != b[i]) {
                    return false;
                }
            }
        }
        return true;
    }
}