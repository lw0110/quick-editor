import {Component} from "@angular/core";
import {QuickEditorElement} from "./quick-editor-element";

@Component({
    selector: 'quick-editor-text-area',
    template: `
    <div [ngClass]="{'form-group': true, 'has-warning': isDirty(), 'has-feedback': isDirty()}">
        <label class="col-sm-2 control-label">{{metadata.label}}</label>
        <div class="col-sm-10">
            <textarea class="form-control" [(ngModel)]="currentValue" [readonly]="!isEditable" rows="3" [formControl]="formControl"></textarea>
            <span *ngIf="isDirty()" class="glyphicon glyphicon glyphicon-asterisk form-control-feedback" aria-hidden="true"></span>
        </div>
    </div>   
    `,
    inputs: ['originalValue']
})

export class QuickEditorTextAreaComponent extends QuickEditorElement {
}