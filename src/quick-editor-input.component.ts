import {Component} from "@angular/core";
import {QuickEditorElement} from "./quick-editor-element";

declare var module: {id: string};

@Component({
    moduleId: module.id,
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
                [placeholder]="metadata.placeholder" [formControl]="formControl">
            <span *ngIf="isDirty()" class="glyphicon glyphicon glyphicon-asterisk form-control-feedback" aria-hidden="true"></span>
        </div>
    </div>    
    `,
    inputs: ['originalValue']
})

export class QuickEditorInputComponent extends QuickEditorElement {
}