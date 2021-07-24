import {Injectable} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {SpinnerComponent} from './spinner.component';

@Injectable({
    providedIn: 'root',
})
export class SpinnerService {
    private overlayRef: OverlayRef | null = null;

    constructor(private overlay: Overlay) {}

    public show(): void {
        if (!this.overlayRef) {
            this.overlayRef = this.overlay.create();
        }
        const spinnerOverlayPortal = new ComponentPortal(SpinnerComponent);
        this.overlayRef.attach(spinnerOverlayPortal);
    }

    public hide(): void {
        if (!!this.overlayRef) {
            this.overlayRef.detach();
        }
    }
}
