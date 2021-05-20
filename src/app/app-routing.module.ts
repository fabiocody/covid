import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'today', pathMatch: 'full'},
  {path: 'today', loadChildren: () => import('./pages/today/today.module').then(m => m.TodayModule)},
  {path: 'charts', loadChildren: () => import('./pages/charts/charts.module').then(m => m.ChartsModule)},
  {path: 'data-table', loadChildren: () => import('./pages/data-table/data-table.module').then(m => m.DataTableModule)},
  {path: 'regions-data', loadChildren: () => import('./pages/regions-data/regions-data.module').then(m => m.RegionsDataModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
