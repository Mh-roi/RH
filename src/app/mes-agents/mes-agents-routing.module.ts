import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesAgentsComponent } from './mes-agents.component';
import { ListPointageComponent } from './pointage/list-pointage/list-pointage.component';

const routes: Routes = [
    {
        path: '',
        component: MesAgentsComponent,
    },
    {
        path: 'pointer',
        component: ListPointageComponent,
    },


    {
        path: 'pointage',
        loadChildren: () =>
            import('./pointage/pointage.module').then((m) => m.PointageModule),
        data: { breadcrumb: 'Gestion des pointages' },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MesAgentsRoutingModule {}
