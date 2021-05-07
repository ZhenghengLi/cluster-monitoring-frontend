import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
    title = 'cluster-monitoring-frontend';
    constructor() {}

    date = new FormControl(new Date());

    printEvent(event: MatDatepickerInputEvent<Date>) {
        console.log(event.value);
    }

    clear() {
        this.date.reset();
    }
}
