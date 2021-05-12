import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChartLine, ChartUsers } from './state-management/models';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from './state-management/state';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
    cpuUtilChart: Observable<ChartLine[]>;
    cpuMemChart: Observable<ChartLine[]>;
    gpuUtilChart: Observable<ChartLine[]>;
    gpuMemChart: Observable<ChartLine[]>;

    topUsersChart: Observable<ChartUsers[]>;
    topUsersColumns: string[] = ['name', 'utilization', 'memory'];

    trackChart(index: number, item: ChartUsers): string {
        return item.name;
    }

    constructor(private store: Store<State>) {
        this.cpuUtilChart = this.store.select('cpuOverview', 'utilization');
        this.cpuMemChart = this.store.select('cpuOverview', 'memory');
        this.gpuUtilChart = this.store.select('gpuOverview', 'utilization');
        this.gpuMemChart = this.store.select('gpuOverview', 'memory');

        this.topUsersChart = this.store.select('topUsers');
    }

    ngOnInit(): void {}
}
