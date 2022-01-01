import {TestBed} from '@angular/core/testing';
import {ChartHelperService} from './chart-helper.service';

describe('ChartHelperService', () => {
    let service: ChartHelperService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ChartHelperService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
