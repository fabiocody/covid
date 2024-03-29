import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {DataService} from '../../services/data/data.service';
import {DataModel} from '../../model/DataModel';
import {RegionsService} from '../../services/regions/regions.service';
import {SubSink} from 'subsink';
import {DeltaService} from '../../services/delta/delta.service';
import {DateService} from '../../services/date/date.service';

@Component({
    selector: 'app-regions-data',
    templateUrl: './regions-data.component.html',
    styleUrls: ['./regions-data.component.scss'],
})
export class RegionsDataComponent implements OnInit, OnDestroy {
    public COLUMNS = ['region', 'total', 'active', 'recovered', 'deaths', 'hospitalized', 'icu', 'tests', 'ptPercent'];
    private data: DataModel[] = [];
    public dataSource = new MatTableDataSource<DataModel>();
    public date = new Date();
    public maxDate = new Date();
    private lastSort: Sort | undefined;
    public delta = false;
    public populationRatio = false;
    public weekDelta = false;
    private subs = new SubSink();

    @ViewChild(MatSort) sort: MatSort | undefined;

    constructor(private dataService: DataService, private regionsService: RegionsService) {}

    private static compare(a: number | string, b: number | string, isAsc: boolean): number {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    ngOnInit(): void {
        this.subs.sink = this.dataService.regionsData.subscribe(data => {
            this.maxDate = DateService.max(data.map(d => d.date));
            this.date = this.maxDate;
            this.data = data;
            this.populateTable();
        });
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    public setPopulationRatio(value: boolean): void {
        this.populationRatio = value;
        this.populateTable();
    }

    public setDelta(delta: boolean): void {
        this.delta = delta;
        if (this.delta && this.weekDelta) {
            this.weekDelta = false;
        }
        this.populateTable();
    }

    public setWeekDelta(value: boolean): void {
        this.weekDelta = value;
        if (this.delta && this.weekDelta) {
            this.delta = false;
        }
        this.populateTable();
    }

    public populateTable(): void {
        let tableData: DataModel[] = this.data;
        if (this.delta) {
            tableData = [];
            for (const region of this.regionsService.REGIONS) {
                const regionData = this.data.filter(d => d.region === region);
                tableData.push(...DeltaService.createDelta(regionData));
            }
        }
        if (this.weekDelta) {
            tableData = [];
            for (const region of this.regionsService.REGIONS) {
                const regionData = this.data.filter(d => d.region === region);
                tableData.push(...DeltaService.createWeekDelta(regionData));
            }
        }
        if (this.populationRatio) {
            tableData = tableData.map(d => DataModel.cloneWithPopulation(d, this.dataService.population[d.region]));
        }
        this.dataSource.data = tableData.filter(
            d => d.date >= this.date && d.date <= DateService.addDays(this.date, 1),
        );
        if (this.sort !== undefined) {
            this.dataSource.sort = this.sort;
            const sortState: Sort = this.lastSort !== undefined ? this.lastSort : {active: 'region', direction: 'asc'};
            this.sort.active = sortState.active;
            this.sort.direction = sortState.direction;
            this.sort.sortChange.emit(sortState);
        }
    }

    public sortData(sort: Sort): void {
        this.lastSort = sort;
        const data = this.dataSource.data.slice();
        if (!sort.active || sort.direction === '') {
            this.dataSource.data = data;
        } else {
            const isAsc = sort.direction === 'asc';
            this.dataSource.data = data.sort((a, b) => {
                switch (sort.active) {
                    case 'region':
                        return RegionsDataComponent.compare(a.region, b.region, isAsc);
                    case 'total':
                        return RegionsDataComponent.compare(a.totalCases, b.totalCases, isAsc);
                    case 'active':
                        return RegionsDataComponent.compare(a.activeCases, b.activeCases, isAsc);
                    case 'recovered':
                        return RegionsDataComponent.compare(a.recovered, b.recovered, isAsc);
                    case 'deaths':
                        return RegionsDataComponent.compare(a.deaths, b.deaths, isAsc);
                    case 'hospitalized':
                        return RegionsDataComponent.compare(a.hospitalized, b.hospitalized, isAsc);
                    case 'icu':
                        return RegionsDataComponent.compare(a.icu, b.icu, isAsc);
                    case 'tests':
                        return RegionsDataComponent.compare(a.tests, b.tests, isAsc);
                    case 'ptPercent':
                        return RegionsDataComponent.compare(a.positiveTestsRatio, b.positiveTestsRatio, isAsc);
                    default:
                        return 0;
                }
            });
        }
    }
}
