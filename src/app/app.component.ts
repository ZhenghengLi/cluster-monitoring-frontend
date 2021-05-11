import { Component, ViewEncapsulation } from '@angular/core';
import { ChartLine } from './state-management/models';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from './state-management/state';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
    cpuUtilChart: Observable<ChartLine[]>;
    cpuMemChart: Observable<ChartLine[]>;
    gpuUtilChart: Observable<ChartLine[]>;
    gpuMemChart: Observable<ChartLine[]>;

    constructor(private store: Store<State>) {
        this.cpuUtilChart = this.store.select('cpuOverview', 'utilization');
        this.cpuMemChart = this.store.select('cpuOverview', 'memory');
        this.gpuUtilChart = this.store.select('gpuOverview', 'utilization');
        this.gpuMemChart = this.store.select('gpuOverview', 'memory');
    }
}
