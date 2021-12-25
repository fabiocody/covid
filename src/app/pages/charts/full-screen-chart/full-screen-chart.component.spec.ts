import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FullScreenChartComponent} from './full-screen-chart.component';

describe('FullScreenChartComponent', () => {
    let component: FullScreenChartComponent;
    let fixture: ComponentFixture<FullScreenChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FullScreenChartComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FullScreenChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
