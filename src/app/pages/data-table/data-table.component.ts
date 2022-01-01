import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataModel} from '../../model/DataModel';
import {DataService} from '../../services/data/data.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {SubSink} from 'subsink';
import {DeltaService} from '../../services/delta/delta.service';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, OnDestroy, AfterViewInit {
    public COLUMNS = ['date', 'total', 'active', 'recovered', 'deaths', 'hospitalized', 'icu', 'tests', 'ptPercent'];
    private data: DataModel[] = [];
    public dataSource = new MatTableDataSource<DataModel>();
    private delta = false;
    private populationRatio = false;
    private subs = new SubSink();

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private dataService: DataService) {}

    ngOnInit(): void {
        this.subs.sink = this.dataService.data.subscribe(data => {
            this.data = data;
            this.populateTable();
        });
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    public populateTable(): void {
        this.dataSource.data = this.data;
        if (this.delta) {
            this.dataSource.data = DeltaService.createDelta(this.dataSource.data);
        }
        if (this.populationRatio) {
            this.dataSource.data = this.dataSource.data.map(d =>
                DataModel.cloneWithPopulation(d, this.dataService.population[d.region]),
            );
        }
    }

    public setDelta(delta: boolean): void {
        this.delta = delta;
        this.populateTable();
    }

    public setPopulationRatio(value: boolean): void {
        this.populationRatio = value;
        this.populateTable();
    }
}
