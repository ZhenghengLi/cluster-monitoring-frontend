import { NodeGpuLoad, ChartDevUtil } from '../models';

export function nodeGpuLoad2ChartDevUtil(data: NodeGpuLoad[]): ChartDevUtil {
    const nodeUtil: { [node: string]: { [busid: string]: [number, number][] } } = {};
    const nodeMem: { [node: string]: { [busid: string]: [number, number][] } } = {};

    for (const record of data) {
        // utilization
        if (typeof nodeUtil[record.node] === 'undefined') {
            nodeUtil[record.node] = {};
        }
        if (typeof nodeUtil[record.node][record.busid] === 'undefined') {
            nodeUtil[record.node][record.busid] = [];
        }
        nodeUtil[record.node][record.busid].push([+record.time, record.gpu]);
        // memory
        if (typeof nodeMem[record.node] === 'undefined') {
            nodeMem[record.node] = {};
        }
        if (typeof nodeMem[record.node][record.busid] === 'undefined') {
            nodeMem[record.node][record.busid] = [];
        }
        nodeMem[record.node][record.busid].push([+record.time, record.mem]);
    }

    const chartDevUtil: ChartDevUtil = {
        utilization: [],
        memory: [],
    };

    // utilization
    Object.keys(nodeUtil)
        .sort()
        .forEach((node) => {
            Object.keys(nodeUtil[node])
                .sort()
                .forEach((busid, idx) => {
                    chartDevUtil.utilization.push({
                        name: [node, idx.toString()].join('-'),
                        data: nodeUtil[node][busid],
                    });
                });
        });

    // memory
    Object.keys(nodeMem)
        .sort()
        .forEach((node) => {
            Object.keys(nodeMem[node])
                .sort()
                .forEach((busid, idx) => {
                    chartDevUtil.memory.push({
                        name: [node, idx.toString()].join('-'),
                        data: nodeMem[node][busid],
                    });
                });
        });

    return chartDevUtil;
}
