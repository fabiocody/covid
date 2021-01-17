import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TodayComponent} from './pages/today/today.component';
import {ChartsComponent} from './pages/charts/charts.component';
import {DataTableComponent} from './pages/data-table/data-table.component';
import {RegionsDataComponent} from './pages/region-data/regions-data.component';

const routes: Routes = [
  {path: '', redirectTo: 'today', pathMatch: 'full'},
  {path: 'today', component: TodayComponent},
  {path: 'charts', component: ChartsComponent},
  {path: 'data-table', component: DataTableComponent},
  {path: 'regions-data', component: RegionsDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
