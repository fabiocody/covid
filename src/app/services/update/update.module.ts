import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UpdateService} from './update.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
    declarations: [],
    imports: [CommonModule, MatSnackBarModule],
    providers: [UpdateService],
})
export class UpdateModule {}
