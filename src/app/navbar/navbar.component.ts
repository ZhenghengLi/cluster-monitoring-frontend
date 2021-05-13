import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../state-management/state';
import { lastHours, selectDate } from '../state-management/actions';
import { interval, Subscription, timer } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
    date = new FormControl(null);
    hours = new FormControl(1, { validators: [Validators.min(1), Validators.max(24)] });

    private refreshInterval = interval(30000);
    private repeatSubs: Subscription | undefined;

    constructor(private store: Store<State>) {}

    ngOnInit(): void {
        if (this.hours.valid && this.hours.value !== null) {
            const hours = this.hours.value;
            this.repeatSubs = this.refreshInterval.subscribe(() => {
                this.store.dispatch(lastHours({ hours }));
            });
            timer(500).subscribe(() => this.store.dispatch(lastHours({ hours })));
        }

        this.date.valueChanges.subscribe(() => {
            if (this.date.valid && this.date.value !== null) {
                this.hours.reset(null, { emitEvent: false });
                if (!this.repeatSubs?.closed) this.repeatSubs?.unsubscribe();
                this.store.dispatch(selectDate({ date: this.date.value }));
            }
        });
        this.hours.valueChanges.subscribe(() => {
            if (this.hours.valid && this.hours.value !== null) {
                const hours = this.hours.value;
                this.date.reset(null, { emitEvent: false });
                this.store.dispatch(lastHours({ hours }));
                if (!this.repeatSubs?.closed) this.repeatSubs?.unsubscribe();
                this.repeatSubs = this.refreshInterval.subscribe(() => {
                    this.store.dispatch(lastHours({ hours }));
                });
            }
        });
    }

    ngOnDestroy(): void {
        if (!this.repeatSubs?.closed) this.repeatSubs?.unsubscribe();
    }
}
