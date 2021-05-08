import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { TimePercentChartComponent } from './time-percent-chart/time-percent-chart.component';

@NgModule({
    declarations: [AppComponent, NavbarComponent, TimePercentChartComponent],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxJsonViewerModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts'),
        }),
        StoreModule.forRoot({}, {}),
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatCardModule,
        MatDividerModule,
        MatListModule,
        MatGridListModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
