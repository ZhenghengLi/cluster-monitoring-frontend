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
    constructor(private query: QueryService) {
        const now = new Date().getTime();
        query.getNodeCpuLoad(now - 3 * 60000, now).subscribe((data) => console.log(data));
        query.getNodeGpuLoad(now - 3 * 60000, now).subscribe((data) => console.log(data));
        query.getUserCpuMem(now - 3 * 60000, now).subscribe((data) => console.log(data));
    }
}
