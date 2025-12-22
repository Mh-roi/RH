import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReclamationComponent } from './reclamation.component';
import { ListeReclamationComponent } from './liste-reclamation/liste-reclamation.component';
const routes: Routes = [
    // { path: 'reclamations/liste', component: ListeReclamationComponent },
    { path: 'liste/:ficheId', component: ListeReclamationComponent },
    { path: 'reclamations/:id/edit', component: ReclamationComponent },
    { path: '', redirectTo: '/reclamations', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class Re {}
