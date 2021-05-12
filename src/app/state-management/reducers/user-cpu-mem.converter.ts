import { ChartUsers, ChartDevUtil, UserCpuMem } from '../models';

function fillGap(data: [number, number][], gap: number): [number, number][] {
    if (data.length < 2) return data;
    if (gap <= 0) return data;
    // sort data
    data.sort((a, b) => a[0] - b[0]);
    // fill gap
    const result: [number, number][] = [data[0]];
    for (let idx = 1; idx < data.length; idx++) {
        const t0 = data[idx - 1][0];
        const t1 = data[idx][0];
        if (t1 - t0 > gap) {
            result.push([t0 + gap / 3, 0]);
            result.push([t1 - gap / 3, 0]);
            result.push(data[idx]);
        } else {
            result.push(data[idx]);
        }
    }
    // return
    return result;
}

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

    // fill gaps
    for (const user in userData) {
        for (const node in userData[user].cpu) userData[user].cpu[node] = fillGap(userData[user].cpu[node], 150000);
        for (const node in userData[user].mem) userData[user].mem[node] = fillGap(userData[user].mem[node], 150000);
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
        chartUsers.push({ name: user.name, utilization: chart.utilization, memory: chart.memory });
    }

    return chartUsers;
}
