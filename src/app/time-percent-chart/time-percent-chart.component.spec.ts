import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePercentChartComponent } from './time-percent-chart.component';

describe('TimePercentChartComponent', () => {
    let component: TimePercentChartComponent;
    let fixture: ComponentFixture<TimePercentChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TimePercentChartComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TimePercentChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
