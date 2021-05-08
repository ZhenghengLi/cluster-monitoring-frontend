import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-time-percent-chart',
    templateUrl: './time-percent-chart.component.html',
    styleUrls: ['./time-percent-chart.component.scss'],
})
export class TimePercentChartComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        this._updateOptions();
    }

    public initOpts: any = {
        renderer: 'svg',
    };
    public options: any;

    @Input()
    title: string = 'CPU';

    private _updateOptions(): void {
        this.options = {
            animation: false,
            title: {
                text: this.title,
                left: '2%',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 16,
                },
            },
            xAxis: {
                boundaryGap: false,
                type: 'time',
                minInterval: 10000,
                axisLabel: {
                    formatter: (value: number) => {
                        return new Date(value).toLocaleTimeString('en-US', { hour12: false });
                    },
                },
            },
            yAxis: {
                position: 'right',
                name: 'percent (%)',
                nameTextStyle: {
                    fontSize: 14,
                    padding: 20,
                },
                nameLocation: 'center',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                },
                backgroundColor: 'rgba(255,255,255,0.8)',
                position: (pos: Array<number>, params: any, dom: any, rect: any, size: any) => {
                    let obj: any = { top: '5%' };
                    obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = '5%';
                    return obj;
                },
            },
            legend: {
                type: 'scroll',
                right: '2%',
                width: '80%',
                data: this._legendData,
            },
            grid: {
                left: 30,
                bottom: 30,
                right: 60,
                top: 40,
            },
            series: this._seriesData,
        };
    }

    private _legendData: string[] = ['cu01', 'cu02', 'cu03', 'cu04', 'gpu01', 'gpu02', 'gpu03', 'gpu04'];
    private _seriesData: Object[] = [
        {
            name: 'cu01',
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: [
                [0, 12],
                [10000, 26],
                [20000, 39],
            ],
        },
        {
            name: 'cu02',
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: [
                [0, 11],
                [10000, 29],
                [20000, 32],
            ],
        },
        {
            name: 'cu03',
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: [
                [0, 21],
                [10000, 40],
                [20000, 32],
            ],
        },
        {
            name: 'cu04',
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: [
                [0, 19],
                [10000, 33],
                [20000, 41],
            ],
        },
        {
            name: 'gpu01',
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: [
                [0, 10],
                [10000, 20],
                [20000, 30],
            ],
        },
        {
            name: 'gpu02',
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: [
                [0, 15],
                [10000, 10],
                [20000, 35],
            ],
        },
        {
            name: 'gpu03',
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: [
                [0, 15],
                [10000, 18],
                [20000, 39],
            ],
        },
        {
            name: 'gpu03',
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: [
                [0, 14],
                [10000, 13],
                [20000, 31],
            ],
        },
    ];
}
