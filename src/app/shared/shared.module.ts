import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
    declarations: [],
    imports: [
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts'),
        }),
    ],
    exports: [CommonModule, FormsModule, HttpClientModule, MatButtonModule, NgxEchartsModule, NgxJsonViewerModule],
})
export class SharedModule {}
