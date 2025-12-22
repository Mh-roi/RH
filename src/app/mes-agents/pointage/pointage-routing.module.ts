import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPointageComponent } from './list-pointage/list-pointage.component';

const routes: Routes = [
    {
        path: '',
        component: ListPointageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PointageRoutingModule {}
