import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { QueryService } from '../../query.service';
import {
    lastHours,
    selectDate,
    nodeCpuLoadSuccess,
    nodeCpuLoadFailure,
    nodeGpuLoadSuccess,
    nodeGpuLoadFailure,
    userCpuMemSuccess,
    userCpuMemFailure,
} from '../actions';

@Injectable()
export class QueryEffects {
    constructor(private actions: Actions, private query: QueryService) {}

    getNodeCpuLoadHour = createEffect(() =>
        this.actions.pipe(
            ofType(lastHours),
            exhaustMap((action) => {
                const maxTime = new Date().getTime();
                const minTime = maxTime - action.hours * 3600 * 1000;
                return this.query.getNodeCpuLoad(minTime, maxTime).pipe(
                    map((data) => nodeCpuLoadSuccess({ data })),
                    catchError((error) => of(nodeCpuLoadFailure({ error })))
                );
            })
        )
    );

    getNodeCpuLoadDate = createEffect(() =>
        this.actions.pipe(
            ofType(selectDate),
            exhaustMap((action) => {
                const minTime = action.date.getTime();
                const maxTime = minTime + 24 * 3600 * 1000;
                return this.query.getNodeCpuLoad(minTime, maxTime).pipe(
                    map((data) => nodeCpuLoadSuccess({ data })),
                    catchError((error) => of(nodeCpuLoadFailure({ error })))
                );
            })
        )
    );

    getNodeGpuLoadHour = createEffect(() =>
        this.actions.pipe(
            ofType(lastHours),
            exhaustMap((action) => {
                const maxTime = new Date().getTime();
                const minTime = maxTime - action.hours * 3600 * 1000;
                return this.query.getNodeGpuLoad(minTime, maxTime).pipe(
                    map((data) => nodeGpuLoadSuccess({ data })),
                    catchError((error) => of(nodeGpuLoadFailure({ error })))
                );
            })
        )
    );

    getNodeGpuLoadDate = createEffect(() =>
        this.actions.pipe(
            ofType(selectDate),
            exhaustMap((action) => {
                const minTime = action.date.getTime();
                const maxTime = minTime + 24 * 3600 * 1000;
                return this.query.getNodeGpuLoad(minTime, maxTime).pipe(
                    map((data) => nodeGpuLoadSuccess({ data })),
                    catchError((error) => of(nodeGpuLoadFailure({ error })))
                );
            })
        )
    );

    getUserCpuMemHour = createEffect(() =>
        this.actions.pipe(
            ofType(lastHours),
            exhaustMap((action) => {
                const maxTime = new Date().getTime();
                const minTime = maxTime - action.hours * 3600 * 1000;
                return this.query.getUserCpuMem(minTime, maxTime).pipe(
                    map((data) => userCpuMemSuccess({ data })),
                    catchError((error) => of(userCpuMemFailure({ error })))
                );
            })
        )
    );

    getUserCpuMemDate = createEffect(() =>
        this.actions.pipe(
            ofType(selectDate),
            exhaustMap((action) => {
                const minTime = action.date.getTime();
                const maxTime = minTime + 24 * 3600 * 1000;
                return this.query.getUserCpuMem(minTime, maxTime).pipe(
                    map((data) => userCpuMemSuccess({ data })),
                    catchError((error) => of(userCpuMemFailure({ error })))
                );
            })
        )
    );
}
