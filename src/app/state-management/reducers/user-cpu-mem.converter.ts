import { ChartUsers, ChartDevUtil, UserCpuMem } from '../models';

export function userCpuMem2ChartUsers(data: UserCpuMem[]): ChartUsers[] {
    const userData: {
        [name: string]: {
            cpu: { [node: string]: [number, number][] };
            mem: { [node: string]: [number, number][] };
            cpuTotal: number;
            memTotal: number;
        };
    } = {};

    for (const record of data) {
        if (typeof userData[record.user] === 'undefined') {
            userData[record.user] = { cpu: {}, mem: {}, cpuTotal: 0, memTotal: 0 };
        }
        if (typeof userData[record.user].cpu[record.node] === 'undefined') {
            userData[record.user].cpu[record.node] = [];
        }
        if (typeof userData[record.user].mem[record.node] === 'undefined') {
            userData[record.user].mem[record.node] = [];
        }
        const cpu = Math.round((record.cpu + Number.EPSILON) * 100) / 100;
        const mem = Math.round((record.mem + Number.EPSILON) * 100) / 100;
        userData[record.user].cpu[record.node].push([+record.time, cpu]);
        userData[record.user].mem[record.node].push([+record.time, mem]);
        userData[record.user].cpuTotal += cpu;
        userData[record.user].memTotal += mem;
    }

    const chartUsers: ChartUsers[] = [];

    return [];
}
