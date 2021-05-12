import { NodeCpuLoad, ChartDevUtil } from '../models';

export function nodeCpuLoad2ChartDevUtil(data: NodeCpuLoad[]): ChartDevUtil {
    const nodeUtil: { [node: string]: [number, number][] } = {};
    const nodeMem: { [node: string]: [number, number][] } = {};
    for (const record of data) {
        if (typeof nodeUtil[record.node] === 'undefined') {
            nodeUtil[record.node] = [];
        }
        if (typeof nodeMem[record.node] === 'undefined') {
            nodeMem[record.node] = [];
        }
        nodeUtil[record.node].push([+record.time, Math.round((100 - record.idle + Number.EPSILON) * 100) / 100]);
        nodeMem[record.node].push([+record.time, Math.round((record.memory + Number.EPSILON) * 100) / 100]);
    }

    const chartDevUtil: ChartDevUtil = {
        utilization: [],
        memory: [],
    };

    for (let node of Object.keys(nodeUtil).sort()) {
        chartDevUtil.utilization.push({
            name: node,
            data: nodeUtil[node],
        });
    }
    for (let node of Object.keys(nodeMem).sort()) {
        chartDevUtil.memory.push({
            name: node,
            data: nodeMem[node],
        });
    }

    return chartDevUtil;
}
