import { createReducer, on, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { State, initialCpuOverview, initialGpuOverview, initialTopUsers } from '../state';

const cpuOverviewReducer = createReducer(initialCpuOverview);

const gpuOverviewReducer = createReducer(initialGpuOverview);

const topUsersReducer = createReducer(initialTopUsers);

export const reducers: ActionReducerMap<State> = {
    cpuOverview: cpuOverviewReducer,
    gpuOverview: gpuOverviewReducer,
    topUsers: topUsersReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
