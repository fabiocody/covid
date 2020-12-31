import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TodayComponent} from './views/today/today.component';
import {ChartsComponent} from './views/charts/charts.component';
import {DataTableComponent} from './views/data-table/data-table.component';

const routes: Routes = [
  {path: '', redirectTo: 'today', pathMatch: 'full'},
  {path: 'today', component: TodayComponent},
  {path: 'charts', component: ChartsComponent},
  {path: 'data-table', component: DataTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
