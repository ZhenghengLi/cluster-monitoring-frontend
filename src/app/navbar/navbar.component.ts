import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
    date = new FormControl(null, { updateOn: 'blur' });
    hours = new FormControl(null, { updateOn: 'blur', validators: [Validators.min(1), Validators.max(24)] });
    subs = new Subscription();

    constructor() {}

    ngOnInit(): void {
        this.subs.add(
            this.date.valueChanges.subscribe(() => {
                console.log(this.date.value);
                console.log(this.date.valid);
                this.hours.reset(null, { emitEvent: false });
            })
        );
        this.subs.add(
            this.hours.valueChanges.subscribe(() => {
                console.log(this.hours.value);
                console.log(this.hours.valid);
                this.date.reset(null, { emitEvent: false });
            })
        );
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
