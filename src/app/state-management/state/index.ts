import { ChartDevUtil, ChartUsers } from '../models';

export interface State {
    cpuOverview: ChartDevUtil;
    gpuOverview: ChartDevUtil;
    topUsers: ChartUsers[];
}

export const initialCpuOverview: ChartDevUtil = {
    utilization: [],
    memory: [],
};

export const initialGpuOverview: ChartDevUtil = {
    utilization: [],
    memory: [],
};

export const initialTopUsers: ChartUsers[] = [];
