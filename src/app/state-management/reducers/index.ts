import { createReducer, on, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { State, initialCpuOverview, initialGpuOverview, initialTopUsers } from '../state';
import { nodeCpuLoadSuccess, nodeGpuLoadSuccess, userCpuMemSuccess } from '../actions';

const cpuOverviewReducer = createReducer(
    initialCpuOverview,
    on(nodeCpuLoadSuccess, (state, action) => {
        console.log(action);
        console.log(state);
        return state;
    })
);

const gpuOverviewReducer = createReducer(
    initialGpuOverview,
    on(nodeGpuLoadSuccess, (state, action) => {
        console.log(action);
        console.log(state);
        return state;
    })
);

const topUsersReducer = createReducer(
    initialTopUsers,
    on(userCpuMemSuccess, (state, action) => {
        console.log(action);
        return state;
    })
);

export const reducers: ActionReducerMap<State> = {
    cpuOverview: cpuOverviewReducer,
    gpuOverview: gpuOverviewReducer,
    topUsers: topUsersReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
