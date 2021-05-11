import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { QueryService } from '../../query.service';
import { lastHours, selectDate, nodeCpuLoadSuccess, nodeGpuLoadSuccess, userCpuMemSuccess } from '../actions';

@Injectable()
export class QueryEffects {
    constructor(private actions: Actions, private query: QueryService) {}

    getNodeCpuLoadHour = createEffect(() =>
        this.actions.pipe(
            ofType(lastHours),
            map((action) => {
                console.log('NodeCpuLoad', action.hours);
                return nodeCpuLoadSuccess({ data: [] });
            })
        )
    );

    getNodeGpuLoadHour = createEffect(() =>
        this.actions.pipe(
            ofType(lastHours),
            map((action) => {
                console.log('NodeGpuLoad', action.hours);
                return nodeCpuLoadSuccess({ data: [] });
            })
        )
    );

    getUserCpuMem = createEffect(() =>
        this.actions.pipe(
            ofType(lastHours),
            map((action) => {
                console.log('UserCpuMem', action.hours);
                return nodeCpuLoadSuccess({ data: [] });
            })
        )
    );
}
