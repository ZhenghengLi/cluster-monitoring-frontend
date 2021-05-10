import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { Config, NodeCpuLoad, NodeGpuLoad, UserCpuMem, TimeRangeFilter } from './state-management/models';

@Injectable({
    providedIn: 'root',
})
export class QueryService {
    private apiServerUrl: string | undefined;

    constructor(private http: HttpClient) {}

    private getApiServerUrl(): Observable<string> {
        const configUrl = 'assets/config.json';
        if (this.apiServerUrl) {
            return of(this.apiServerUrl);
        } else {
            return this.http.get<Config>(configUrl).pipe(
                map((config) => {
                    this.apiServerUrl = config.api_server_url;
                    if (this.apiServerUrl) {
                        return this.apiServerUrl;
                    } else {
                        throw Error(`failed to get api server url from ${configUrl}`);
                    }
                })
            );
        }
    }

    getNodeCpuLoad(minTime: number, maxTime: number): Observable<NodeCpuLoad[]> {
        const filter: TimeRangeFilter = {
            where: {
                time: {
                    between: [minTime, maxTime],
                },
            },
        };
        const params = new HttpParams().set('filter', JSON.stringify(filter));

        return this.getApiServerUrl().pipe(
            map((url) => url + '/node-cpu-load'),
            concatMap((url) => {
                return this.http.get<NodeCpuLoad[]>(url, { params });
            })
        );
    }

    getNodeGpuLoad(minTime: number, maxTime: number): Observable<NodeGpuLoad[]> {
        return of([]);
    }

    getUserCpuMem(minTime: number, maxTime: number): Observable<UserCpuMem[]> {
        return of([]);
    }
}
