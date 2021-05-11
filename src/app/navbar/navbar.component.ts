import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../state-management/state';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
    date = new FormControl(null, { updateOn: 'blur' });
    hours = new FormControl(1, { updateOn: 'blur', validators: [Validators.min(1), Validators.max(24)] });

    constructor(private store: Store<State>) {}

    ngOnInit(): void {
        this.date.valueChanges.subscribe(() => {
            console.log(this.date.value);
            console.log(this.date.valid);
            this.hours.reset(null, { emitEvent: false });
        });
        this.hours.valueChanges.subscribe(() => {
            console.log(this.hours.value);
            console.log(this.hours.valid);
            this.date.reset(null, { emitEvent: false });
        });
    }

    ngOnDestroy(): void {}
}
