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
    cpuUtilChart: Observable<ChartLine[]> = of([]);
    cpuMemChart: Observable<ChartLine[]> = of([]);
    gpuUtilChart: Observable<ChartLine[]> = of([]);
    gpuMemChart: Observable<ChartLine[]> = of([]);

    constructor(private store: Store<State>) {}

    chartData: Observable<ChartLine[]> = of([
        {
            name: 'cu01',
            data: [
                [0, 12],
                [10000, 26],
                [20000, 39],
            ],
        },
        {
            name: 'cu02',
            data: [
                [0, 11],
                [10000, 29],
                [20000, 32],
            ],
        },
        {
            name: 'cu03',
            data: [
                [0, 21],
                [10000, 40],
                [20000, 32],
            ],
        },
        {
            name: 'cu04',
            data: [
                [0, 19],
                [10000, 33],
                [20000, 41],
            ],
        },
        {
            name: 'gpu01',
            data: [
                [0, 10],
                [10000, 20],
                [20000, 30],
            ],
        },
        {
            name: 'gpu02',
            data: [
                [0, 15],
                [10000, 10],
                [20000, 35],
            ],
        },
        {
            name: 'gpu03',
            data: [
                [0, 15],
                [10000, 18],
                [20000, 39],
            ],
        },
        {
            name: 'gpu04',
            data: [
                [0, 14],
                [10000, 13],
                [20000, 31],
            ],
        },
    ]);
}
