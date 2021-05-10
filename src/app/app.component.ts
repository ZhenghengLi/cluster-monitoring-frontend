import { Component, ViewEncapsulation } from '@angular/core';
import { QueryService } from './query.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
    title = 'cluster-monitoring-frontend';
    constructor(private query: QueryService) {}
}
