import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegionsDataComponent} from './regions-data.component';

const routes: Routes = [
  {path: '', component: RegionsDataComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionsDataRoutingModule {
}
