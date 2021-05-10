import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class QueryService {
    constructor() {
        console.log('service init');
    }
}
