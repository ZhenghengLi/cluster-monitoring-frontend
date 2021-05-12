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

    // collect data
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

    // sort users
    const userList: { name: string; cpumem: number }[] = [];
    for (const name in userData) {
        const cpumem = userData[name].cpuTotal + userData[name].memTotal;
        userList.push({ name, cpumem });
    }
    userList.sort((a, b) => b.cpumem - a.cpumem);

    // convert
    const chartUsers: ChartUsers[] = [];
    for (const user of userList) {
        const chart: ChartDevUtil = { utilization: [], memory: [] };
        for (const node in userData[user.name].cpu) {
            chart.utilization.push({
                name: node,
                data: userData[user.name].cpu[node],
            });
        }
        for (const node in userData[user.name].mem) {
            chart.memory.push({
                name: node,
                data: userData[user.name].mem[node],
            });
        }
        chartUsers.push({ name: user.name, chart });
    }

    return chartUsers;
}
