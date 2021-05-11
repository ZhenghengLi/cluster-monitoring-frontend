import { createAction, props } from '@ngrx/store';

export const lastHours = createAction('[Nav Bar] Last Hours', props<{ hours: number }>());

export const selectDate = createAction('[Nav Bar] Select Date', props<{ date: Date }>());
