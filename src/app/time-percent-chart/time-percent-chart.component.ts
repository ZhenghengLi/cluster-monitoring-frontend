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
    public updateOptions: any = {};

    public chartInstance: any;

    onChartInit(e: any) {
        this.chartInstance = e;
    }

    @Input()
    set title(titleValue: string) {
        this.updateOptions = Object.assign({}, this.updateOptions, { title: { text: titleValue } });
    }
    @Input()
    set data(chartData: ChartLine[] | null) {
        if (chartData === null) return;
        this.chartInstance?.setOption(this.options, true);
        // convert
        const legendData = [];
        const seriesData = [];
        for (let line of chartData) {
            legendData.push(line.name);
            seriesData.push(
                Object.assign(
                    {
                        type: 'line',
                        smooth: true,
                        showSymbol: false,
                    },
                    line
                )
            );
        }
        // update options
        this.updateOptions = Object.assign({}, this.updateOptions, {
            series: seriesData,
            legend: {
                data: legendData,
            },
        });
    }

    public options: any = {
        legend: {
            type: 'scroll',
            left: 6,
            top: 'center',
            orient: 'vertical',
            height: '90%',
        },
        title: {
            left: 'center',
            textStyle: {
                fontWeight: 'normal',
                fontSize: 18,
                lineHeight: 27,
            },
        },
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
