import {Injectable, OnDestroy} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {SubSink} from 'subsink';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class UpdateService implements OnDestroy {
    private subs = new SubSink();

    constructor(private update: SwUpdate, private snackbar: MatSnackBar) {}

    public ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    public start(): void {
        this.subs.sink = this.update.available.subscribe(event => {
            console.log(event);
            if (event.type === 'UPDATE_AVAILABLE') {
                console.log('Update available');
                this.openSnackBar();
            }
        });
    }

    private openSnackBar(): void {
        this.subs.sink = this.snackbar
            .open('Aggiornamento disponibile', 'Aggiorna', {verticalPosition: 'top'})
            .afterDismissed()
            .subscribe(async dismiss => {
                if (dismiss.dismissedByAction) {
                    await this.activate();
                }
            });
    }

    private async activate(): Promise<void> {
        await this.update.activateUpdate();
        document.location.reload();
    }
}
