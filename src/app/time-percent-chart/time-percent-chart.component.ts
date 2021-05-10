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
    title: string = '';
    @Input()
    set data(chartData: ChartLine[]) {
        // convert
        let legendData = [];
        let seriesData = [];
        for (let line of chartData) {
            legendData.push(line.name);
            seriesData.push({
                name: line.name,
                type: 'line',
                smooth: true,
                showSymbol: false,
                data: line.data,
            });
        }
        // update options
        this.options = {
            animation: false,
            title: {
                text: this.title,
                left: 'center',
                textStyle: {
                    fontWeight: 'bold',
                    fontSize: 15,
                    lineHeight: 27,
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
            grid: {
                left: 100,
                bottom: 30,
                right: 60,
                top: 45,
            },
            legend: {
                type: 'scroll',
                left: 6,
                top: 'center',
                orient: 'vertical',
                width: '75%',
                data: legendData,
            },
            series: seriesData,
        };
    }
}
