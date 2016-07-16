import {
    DynamicComponentLoader,
    Component,
    Input,
    Output,
    EventEmitter,
    AfterViewInit,
    ViewContainerRef,
    ComponentRef,
    ViewChild,
    ElementRef,
    Inject,
    Type
} from "@angular/core";
import {QuickEditorElement} from "./quick-editor-element";
import {EditorMetadata} from "./editor-metadata";
import {Editable} from "./editable";
import {ControlGroup, Validators, FormBuilder, FORM_DIRECTIVES, Control} from "@angular/common";
import {isArray} from "rxjs/util/isArray";

declare var jQuery:any;

@Component({
    selector: 'quick-editor-input',
    template: `
    <style>
        .ng-invalid {
            border-color: #FF0000;
        }
    </style>
    <div [ngClass]="{'form-group': true, 'has-warning': isDirty(), 'has-feedback': isDirty()}">
        <label class="col-sm-2 control-label">{{metadata.label}}</label>
        <div class="col-sm-10">
            <input [id]="metadata.field" class="form-control" [(ngModel)]="currentValue" [readonly]="!isEditable" 
                [placeholder]="metadata.placeholder" [ngFormControl]="formControl">
            <span *ngIf="isDirty()" class="glyphicon glyphicon glyphicon-asterisk form-control-feedback" aria-hidden="true"></span>
        </div>
    </div>    
    `,
    inputs: ['originalValue'],
    directives: [FORM_DIRECTIVES]
})

class QuickEditorInputComponent extends QuickEditorElement {
}

@Component({
    selector: 'quick-editor-text-area',
    template: `
    <div [ngClass]="{'form-group': true, 'has-warning': isDirty(), 'has-feedback': isDirty()}">
        <label class="col-sm-2 control-label">{{metadata.label}}</label>
        <div class="col-sm-10">
            <textarea class="form-control" [(ngModel)]="currentValue" [readonly]="!isEditable" rows="3" [ngFormControl]="formControl"></textarea>
            <span *ngIf="isDirty()" class="glyphicon glyphicon glyphicon-asterisk form-control-feedback" aria-hidden="true"></span>
        </div>
    </div>   
    `,
    inputs: ['originalValue'],
    directives: [FORM_DIRECTIVES]
})

class QuickEditorTextAreaComponent extends QuickEditorElement {
}

declare var google:any;

@Component({
    selector: 'quick-editor-google-map',
    template: `
    <div class="form-group">
        <label class="col-sm-2 control-label">{{metadata.label}}</label>
        <div class="col-sm-10">
            <div [id]="'qe-map-floating-panel-' + id" [hidden]="!isEditable">
                <input type="textbox" [(ngModel)]="geocodeStr">
                <input type="button" value="Geocode" (click)="onSearchGeocode()">
            </div>
            <div [id]="'qe-map-' + id"></div>
        </div>
    </div>
    `,
    styles: [`
        div[id^="qe-map-"] {
            height: 300px;
        }
        
        div[id^="qe-map-floating-panel-"] {
            position: absolute;
            top: 10px;
            left: 25px;
            height: auto;
            z-index: 5;
            background-color: #fff;
            padding: 5px;
            border: 1px solid #999;
            text-align: center;
            padding-left: 10px;
        }
    `],
    inputs: ['originalValue'],
    directives: [FORM_DIRECTIVES]
})

class QuickEditorGoogleMapComponent extends QuickEditorElement implements AfterViewInit {
    marker:any;
    map:any;
    geocodeStr:string;
    geocoder:any;

    ngAfterViewInit():any {
        let centerLatLng = {lat: this.currentValue[0], lng: this.currentValue[1]};
        this.map = new google.maps.Map(document.getElementById('qe-map-' + this.id), {
            zoom: 16,
            center: centerLatLng,
            disableDefaultUI: true
        });

        this.marker = new google.maps.Marker({
            position: centerLatLng,
            map: this.map
        });

        this.geocoder = new google.maps.Geocoder();
    }

    onEdit() {
        super.onEdit();
        this.marker.setDraggable(this.isEditable);
    }

    onSave() {
        let currentPosition = this.marker.getPosition();
        this.currentValue = [currentPosition.lat(), currentPosition.lng()];
        super.onSave();
    }

    resetValue() {
        super.resetValue();
        let centerLatLng = {lat: this.currentValue[0], lng: this.currentValue[1]};
        if (this.marker) {
            this.marker.setPosition(centerLatLng);
            this.marker.setDraggable(this.isEditable);
        }

        if (this.map) {
            this.map.setCenter(centerLatLng);
        }

    }

    onSearchGeocode() {
        let _this = this;
        this.geocoder.geocode({'address': this.geocodeStr}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                _this.map.setCenter(results[0].geometry.location);
                _this.marker.setPosition(results[0].geometry.location);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

}

@Component({
    selector: 'quick-editor-tags-input',
    template: `
    <div [ngClass]="{'form-group': true, 'has-warning': isDirty(), 'has-feedback': isDirty()}">
        <label class="col-sm-2 control-label">{{metadata.label}}</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="tokenfield" [value]="currentValue"/>
            <span *ngIf="isDirty()" class="glyphicon glyphicon glyphicon-asterisk form-control-feedback" aria-hidden="true"></span>
        </div>
    </div>
    `
})

class QuickEditorTagsInputComponent extends QuickEditorElement {

    elementRef:ElementRef;
    tokenFieldRef:any;

    @Input()
    autoCompleteSource:String[] = [];

    constructor(@Inject(ElementRef) elementRef:ElementRef) {
        super();
        this.elementRef = elementRef;
    }

    set originalValue(value:any) {
        if(!isArray(value)) {
            value = [];
        }

        this.origValue = value.slice(0);
        this.resetValue();
    }

    ngAfterViewInit() {
        var _this = this;
        this.tokenFieldRef = jQuery(this.elementRef.nativeElement).find('#tokenfield');
        this.tokenFieldRef.tokenfield({
            autocomplete: {
                source: _this.autoCompleteSource,
                delay: 100
            },
            showAutocompleteOnFocus: true
        }).on('tokenfield:createdtoken', function () {
            _this.updateCurrentValueFromUI();
        }).on('tokenfield:removedtoken', function () {
            _this.updateCurrentValueFromUI();
        });
        this.tokenFieldRef.tokenfield('disable');
    }

    onEdit() {
        super.onEdit();
        this.tokenFieldRef.tokenfield('enable');
    }

    resetValue() {
        super.resetValue();
        if (this.tokenFieldRef) {
            this.tokenFieldRef.tokenfield('disable');
            this.tokenFieldRef.tokenfield('setTokens', this.origValue);
        }
    }

    private updateCurrentValueFromUI():void {
        this.currentValue = this.tokenFieldRef.tokenfield('getTokens').map(function (item) {
            return item.value;
        });
    }

}

@Component({
    selector: 'quick-editor',
    template: `
    <form [ngFormModel]="quickEditorModel" class="form-horizontal">
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
    `,
    directives: [QuickEditorInputComponent, FORM_DIRECTIVES]
})

export class QuickEditorComponent {
    @Input()
    metadataArray:EditorMetadata[];
    @Input()
    dataModel:any;
    @Output()
    onSave = new EventEmitter();
    @Output()
    onDelete = new EventEmitter();

    childrenRef:Editable[] = [];
    isEditable:boolean = false;
    quickEditorModel:ControlGroup;

    @ViewChild('child', {read: ViewContainerRef})
    childContentPlace:ViewContainerRef;

    static EDITOR_TYPE_MAP:{[key:string]:Type;} = {
        'TextInput': QuickEditorInputComponent,
        'TextArea': QuickEditorTextAreaComponent,
        'GoogleMap': QuickEditorGoogleMapComponent,
        'TagsInput': QuickEditorTagsInputComponent
    };

    constructor(private dcl:DynamicComponentLoader,
                private fb:FormBuilder) {
        this.quickEditorModel = fb.group({});
    }

    ngAfterViewInit() {
        // use recursive func to resolve wrong insertion ordering
        // https://github.com/angular/angular/issues/7854
        var fn = function (array:EditorMetadata[]) {
            if (array.length == 0) return;
            let metadata:EditorMetadata = array[0];
            this.dcl.loadNextToLocation(QuickEditorComponent.EDITOR_TYPE_MAP[metadata.type], this.childContentPlace)
                .then((ref:ComponentRef<any>) => {
                    // update validator
                    this.quickEditorModel.addControl(metadata.field, metadata.required ? new Control('', Validators.required) : new Control());

                    ref.instance.formControl = this.quickEditorModel.find(metadata.field);
                    ref.instance.metadata = metadata;
                    ref.instance.dataModel = this.dataModel;
                    ref.instance.originalValue = this.dataModel[metadata.field];
                    ref.instance.id = this.dataModel.id;

                    this.childrenRef.push(ref.instance);
                    fn.apply(this, [array.slice(1)]);
                });
        }

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