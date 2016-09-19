import {Component, ElementRef, Input, Inject} from "@angular/core";
import {QuickEditorElement} from "./quick-editor-element";
import {isArray} from "rxjs/util/isArray";

declare var jQuery: any;

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

export class QuickEditorTagsInputComponent extends QuickEditorElement {

    elementRef: ElementRef;
    tokenFieldRef: any;

    @Input()
    autoCompleteSource: String[] = [];

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super();
        this.elementRef = elementRef;
    }

    set originalValue(value: any) {
        if (!isArray(value)) {
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

    private updateCurrentValueFromUI(): void {
        this.currentValue = this.tokenFieldRef.tokenfield('getTokens').map(function (item) {
            return item.value;
        });
    }

}