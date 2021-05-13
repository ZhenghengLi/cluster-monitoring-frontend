import { Component, OnInit, Input } from '@angular/core';
import { ChartLine } from '../state-management/models';

@Component({
    selector: 'app-time-percent-chart',
    templateUrl: './time-percent-chart.component.html',
    styleUrls: ['./time-percent-chart.component.scss'],
})
export class TimePercentChartComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    public initOpts: any = { renderer: 'svg' };
    public options: any;

    @Input()
    set title(titleValue: string) {
        this.dynamicOptions.title.text = titleValue;
        this.options = { ...this.staticOptions, ...this.dynamicOptions };
    }
    @Input()
    set data(chartData: ChartLine[]) {
        this.dynamicOptions.series = [];
        this.dynamicOptions.legend.data = [];
        for (let line of chartData) {
            this.dynamicOptions.legend.data.push(line.name);
            this.dynamicOptions.series.push({
                ...line,
                ...{
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                },
            });
        }
        this.options = { ...this.staticOptions, ...this.dynamicOptions };
    }

    public dynamicOptions = {
        title: {
            text: '' as string,
            left: 'center',
            textStyle: {
                fontWeight: 'normal',
                fontSize: 18,
                lineHeight: 27,
            },
        },
        series: [] as any[],
        legend: {
            data: [] as string[],
            type: 'scroll',
            left: 6,
            top: 'center',
            orient: 'vertical',
            height: '90%',
        },
    };

    public staticOptions: any = {
        animation: false,
        grid: {
            left: 100,
            bottom: 30,
            right: 60,
            top: 50,
        },
        xAxis: {
            boundaryGap: false,
            type: 'time',
            minInterval: 900000,
            axisLabel: {
                formatter: (value: number) => {
                    return new Date(value).toLocaleTimeString('en-US', { hour12: false }).substring(0, 5);
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
            min: 0,
            max: 100,
        },
        sampling: 'lttb',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
            },
            backgroundColor: 'rgba(255,255,255,0.8)',
            position: (pos: Array<number>, params: any, dom: any, rect: any, size: any) => {
                let obj: any = { top: 'center' };
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = '5%';
                return obj;
            },
        },
        toolbox: {
            right: 5,
            showTitle: false,
            feature: {
                dataZoom: {
                    yAxisIndex: false,
                },
            },
        },
    };
}
