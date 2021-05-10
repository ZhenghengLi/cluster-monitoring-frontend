export interface NodeCpuLoad {
    id?: number;
    time: number; // unix timestamp in millisecond
    node: string;
    user: number;
    system: number;
    idle: number;
    iowait: number;
    irq: number;
    softirq: number;
    steal: number;
    guest: number;
    memory: number;
}

export interface NodeGpuLoad {
    id?: number;
    time: number; // unix timestamp in millisecond
    node: string;
    busid: string;
    gpu: number;
    mem: number;
}

export interface UserCpuMem {
    id?: number;
    time: number; // unix timestamp in millisecond
    node: string;
    user: string;
    cpu: number;
    mem: number;
}

export interface TimeRangeFilter {
    order?: string[];
    where: {
        time: {
            between: [number, number]; // unix timestamp in millisecond
        };
    };
}

export interface Config {
    api_server_url: string;
}
