import {Component, AfterViewInit} from "@angular/core";
import {QuickEditorElement} from "./quick-editor-element";
declare var google: any;

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
    inputs: ['originalValue']
})

export class QuickEditorGoogleMapComponent extends QuickEditorElement implements AfterViewInit {
    marker: any;
    map: any;
    geocodeStr: string;
    geocoder: any;

    ngAfterViewInit(): any {
        let centerLatLng = {lat: this.currentValue[0], lng: this.currentValue[1]};
        this.map = new google.maps.Map(document.getElementById('qe-map-' + this.id), {
            zoom: 16,
            center: centerLatLng,
            disableDefaultUI: true,
            zoomControl: true
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
        this.geocoder.geocode({'address': this.geocodeStr}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                _this.map.setCenter(results[0].geometry.location);
                _this.marker.setPosition(results[0].geometry.location);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

}