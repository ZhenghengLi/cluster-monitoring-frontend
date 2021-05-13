import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { ChartLine, ChartUsers } from './state-management/models';
import { Observable, of, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { State } from './state-management/state';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
    cpuUtilChart: Observable<ChartLine[]>;
    cpuMemChart: Observable<ChartLine[]>;
    gpuUtilChart: Observable<ChartLine[]>;
    gpuMemChart: Observable<ChartLine[]>;

    topUsersColumns: string[] = ['name', 'utilization', 'memory'];
    topUsersChartSub: Subscription | undefined;
    topUsersChartData: MatTableDataSource<ChartUsers> = new MatTableDataSource<ChartUsers>();

    nameMap: { [name: string]: string } = {};

    trackChart(index: number, item: ChartUsers): string {
        return item.name;
    }

    constructor(private store: Store<State>, private http: HttpClient) {
        this.cpuUtilChart = this.store.select('cpuOverview', 'utilization');
        this.cpuMemChart = this.store.select('cpuOverview', 'memory');
        this.gpuUtilChart = this.store.select('gpuOverview', 'utilization');
        this.gpuMemChart = this.store.select('gpuOverview', 'memory');
        // load user map
        const nameMapUrl = 'assets/name-map.json';
        this.http.get<{ [name: string]: string }>(nameMapUrl).subscribe((data) => (this.nameMap = data));
    }

    ngOnInit(): void {}

    @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

    ngAfterViewInit(): void {
        if (this.paginator) this.topUsersChartData.paginator = this.paginator;
        this.topUsersChartSub = this.store.select('topUsers').subscribe((data) => (this.topUsersChartData.data = data));
    }

    ngOnDestroy(): void {
        this.topUsersChartSub?.unsubscribe();
    }
}
