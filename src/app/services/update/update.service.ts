import {Injectable, OnDestroy} from '@angular/core';
import {SwUpdate, VersionReadyEvent} from '@angular/service-worker';
import {SubSink} from 'subsink';
import {MatSnackBar} from '@angular/material/snack-bar';
import {filter, map} from 'rxjs/operators';

@Injectable()
export class UpdateService implements OnDestroy {
    private subs = new SubSink();

    constructor(private update: SwUpdate, private snackbar: MatSnackBar) {}

    public ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    public start(): void {
        this.subs.sink = this.update.versionUpdates
            .pipe(
                filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
                map(evt => ({
                    type: 'UPDATE_AVAILABLE',
                    current: evt.currentVersion,
                    available: evt.latestVersion,
                })),
            )
            .subscribe(event => {
                console.log(event);
                if (event.type === 'UPDATE_AVAILABLE') {
                    console.log('Update available');
                    this.openSnackBar();
                }
            });
    }

    public openSnackBar(): void {
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
        try {
            await this.update.activateUpdate();
        } catch {
            console.error('Error while activating update');
        } finally {
            document.location.reload();
        }
    }
}
