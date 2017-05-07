import {
    Component,
    Input,
    Output,
    EventEmitter,
    ViewContainerRef,
    ViewChild,
    Type,
    ReflectiveInjector,
    ComponentFactoryResolver
} from "@angular/core";
import * as QE from "./editor-metadata";
import {Editable} from "./editable";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {QuickEditorInputComponent} from "./quick-editor-input.component";
import {QuickEditorTextAreaComponent} from "./quick-editor-text-area.component";
import {QuickEditorGoogleMapComponent} from "./quick-editor-google-map.component";
import {QuickEditorTagsInputComponent} from "./quick-editor-tags-input.component";

@Component({
    selector: 'quick-editor',
    template: `
    <form [formGroup]="quickEditorModel" class="form-horizontal">
        <div #child></div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <button class="btn btn-info" (click)="onSaveClicked()" [disabled]="!isEditable || !isFormValid()">
                    <span class="glyphicon glyphicon-floppy-save" aria-hidden="true"></span>&nbsp;SAVE
                </button>
                <button class="btn btn-info" (click)="onCancelClicked()" [disabled]="!isEditable">
                    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>&nbsp;CANCEL
                </button>
                <button class="btn btn-info" (click)="onEditClicked()" [disabled]="isEditable">
                    <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>&nbsp;EDIT
                </button>
                <button class="btn btn-warning" (click)="onDeleteClicked()" [disabled]="isEditable">
                    <span class="glyphicon glyphicon-floppy-remove" aria-hidden="true"></span>&nbsp;DELETE
                </button>
            </div>
        </div>
    </form>
    `
})

export class QuickEditorComponent {
    @Input() public metadataArray: QE.EditorMetadata[];
    @Input() public dataModel: any;
    @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
    @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

    childrenRef: Editable[] = [];
    isEditable: boolean = false;
    quickEditorModel: FormGroup;

    @ViewChild('child', {read: ViewContainerRef})
    childContentPlace: ViewContainerRef;

    static EDITOR_TYPE_MAP: {[key: string]: Type<any>;} = {
        'TextInput': QuickEditorInputComponent,
        'TextArea': QuickEditorTextAreaComponent,
        'GoogleMap': QuickEditorGoogleMapComponent,
        'TagsInput': QuickEditorTagsInputComponent
    };

    constructor(private fb: FormBuilder,
                private resolver: ComponentFactoryResolver) {
        this.quickEditorModel = fb.group({});
    }

    ngAfterViewInit() {
        setTimeout(_ => this.inflateComponents());
    }

    inflateComponents() {
        var fn = function (array: QE.EditorMetadata[]) {
            if (array.length == 0) return;
            let metadata: QE.EditorMetadata = array[array.length - 1];
            let factory = this.resolver.resolveComponentFactory(QuickEditorComponent.EDITOR_TYPE_MAP[metadata.type]);
            let injector = ReflectiveInjector.fromResolvedProviders([], this.childContentPlace.parentInjector);
            let ref = this.childContentPlace.createComponent(factory, 0, injector, []);

            this.quickEditorModel.addControl(metadata.field, metadata.required ? new FormControl('', Validators.required) : new FormControl());
            ref.instance.formControl = this.quickEditorModel.get(metadata.field);
            ref.instance.metadata = metadata;
            ref.instance.dataModel = this.dataModel;
            ref.instance.originalValue = this.dataModel[metadata.field];
            ref.instance.id = this.dataModel.id;
            this.childrenRef.push(ref.instance);
            fn.apply(this, [array.slice(0, array.length - 1)]);
        };

        fn.apply(this, [this.metadataArray]);
    }

    onCancelClicked() {
        this.childrenRef.forEach(c => {
            c.resetValue();
        });
        this.isEditable = false;
    }

    onEditClicked() {
        this.childrenRef.forEach(c => {
            c.onEdit();
        });
        this.isEditable = true;
    }

    onSaveClicked() {
        this.childrenRef.forEach(c => {
            c.onSave();
        });
        this.onSave.emit(this.dataModel);
        this.isEditable = false;
    }

    onDeleteClicked() {
        this.onDelete.emit(this.dataModel);
    }

    isFormValid() {
        return this.quickEditorModel.valid
    }
}
;