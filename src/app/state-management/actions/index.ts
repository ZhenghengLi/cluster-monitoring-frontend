import { createAction, props } from '@ngrx/store';
import { NodeCpuLoad, NodeGpuLoad, UserCpuMem } from '../models';

export const lastHours = createAction('[Nav Bar] Last Hours', props<{ hours: number }>());

export const selectDate = createAction('[Nav Bar] Select Date', props<{ date: Date }>());

export const nodeCpuLoadSuccess = createAction('[Query Service] NodeCpuLoad Success', props<{ data: NodeCpuLoad[] }>());

export const nodeGpuLoadSuccess = createAction('[Query Service] NodeGpuLoad Success', props<{ data: NodeGpuLoad[] }>());

export const userCpuMemSuccess = createAction('[Query Service] UserCpuMem Success', props<{ data: UserCpuMem[] }>());
