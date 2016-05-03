export interface Editable {
    resetValue():void;
    onEdit():void;
    onSave():void;
    isDirty():boolean;
}