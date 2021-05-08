import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-time-percent-chart',
    templateUrl: './time-percent-chart.component.html',
    styleUrls: ['./time-percent-chart.component.scss'],
})
export class TimePercentChartComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    @Input()
    title: string = 'CPU';

    public initOpts: any = {
        renderer: 'svg',
    };

    public options: any = {
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
            type: 'value',
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
            data: ['cu01', 'cu02', 'cu03', 'cu04', 'gpu01', 'gpu02', 'gpu03', 'gpu04'],
        },
        grid: {
            left: 30,
            bottom: 30,
            right: 70,
            top: 35,
        },
        series: [
            {
                name: 'cu01',
                type: 'line',
                smooth: true,
                showSymbol: false,
                data: [
                    [0, 120],
                    [10000, 260],
                    [20000, 390],
                ],
            },
            {
                name: 'cu02',
                type: 'line',
                smooth: true,
                showSymbol: false,
                data: [
                    [0, 110],
                    [10000, 290],
                    [20000, 320],
                ],
            },
            {
                name: 'cu03',
                type: 'line',
                smooth: true,
                showSymbol: false,
                data: [
                    [0, 210],
                    [10000, 400],
                    [20000, 320],
                ],
            },
            {
                name: 'cu04',
                type: 'line',
                smooth: true,
                showSymbol: false,
                data: [
                    [0, 190],
                    [10000, 333],
                    [20000, 410],
                ],
            },
            {
                name: 'gpu01',
                type: 'line',
                smooth: true,
                showSymbol: false,
                data: [
                    [0, 100],
                    [10000, 200],
                    [20000, 300],
                ],
            },
            {
                name: 'gpu02',
                type: 'line',
                smooth: true,
                showSymbol: false,
                data: [
                    [0, 150],
                    [10000, 100],
                    [20000, 350],
                ],
            },
            {
                name: 'gpu03',
                type: 'line',
                smooth: true,
                showSymbol: false,
                data: [
                    [0, 159],
                    [10000, 185],
                    [20000, 395],
                ],
            },
            {
                name: 'gpu03',
                type: 'line',
                smooth: true,
                showSymbol: false,
                data: [
                    [0, 140],
                    [10000, 135],
                    [20000, 315],
                ],
            },
        ],
    };
}
