import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class QueryService {
    private apiServerUrl: string | undefined;

    constructor() {
        const configUrl: string = 'assets/config.json';
        (async () => {
            const response = await fetch(configUrl);
            if (!response.ok) {
                throw new Error(`cannot fetch config data from ${configUrl}`);
            }
            const configData = await response.json();
            this.apiServerUrl = configData.api_server_url;
            if (!this.apiServerUrl) {
                throw new Error(`failed to get api server url in config ${configUrl}`);
            }
            console.log('apiServerUrl:', this.apiServerUrl);
        })();
    }
}
