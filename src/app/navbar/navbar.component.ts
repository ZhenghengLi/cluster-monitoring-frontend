import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
    date = new FormControl(null, { updateOn: 'blur' });
    hours = new FormControl(null, { updateOn: 'blur' });
    subs = new Subscription();

    constructor() {}

    ngOnInit(): void {
        this.subs.add(
            this.date.valueChanges.subscribe((v) => {
                console.log(v);
                this.hours.reset(null, { emitEvent: false });
            })
        );
        this.subs.add(
            this.hours.valueChanges.subscribe((v) => {
                console.log(v);
                this.date.reset(null, { emitEvent: false });
            })
        );
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
