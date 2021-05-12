import { createReducer, on, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { State, initialCpuOverview, initialGpuOverview, initialTopUsers } from '../state';
import { nodeCpuLoadSuccess, nodeGpuLoadSuccess, userCpuMemSuccess } from '../actions';
import { nodeCpuLoad2ChartDevUtil } from './node-cpu-load.converter';
import { nodeGpuLoad2ChartDevUtil } from './node-gpu-load.converter';
import { ChartDevUtil } from '../models';

const cpuOverviewReducer = createReducer(
    initialCpuOverview,
    on(nodeCpuLoadSuccess, (state, action) => {
        return nodeCpuLoad2ChartDevUtil(action.data);
    })
);

const gpuOverviewReducer = createReducer(
    initialGpuOverview,
    on(nodeGpuLoadSuccess, (state, action) => {
        return nodeGpuLoad2ChartDevUtil(action.data);
    })
);

const topUsersReducer = createReducer(
    initialTopUsers,
    on(userCpuMemSuccess, (state, action) => {
        return state;
    })
);

export const reducers: ActionReducerMap<State> = {
    cpuOverview: cpuOverviewReducer,
    gpuOverview: gpuOverviewReducer,
    topUsers: topUsersReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
