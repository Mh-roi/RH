import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { DashboardPublicComponent } from './public/dashboard-public.component';
import { Authority } from './shared/constants/authority.constants';
import { ModifierUserComponent } from './account/infos-user/modifier-user/modifier-user.component';
import { DrhLandingComponent } from './drh/drh-landing/drh-landing.component';
import { AgentLandingComponent } from './agent/agent-landing/agent-landing.component';
import { SuperieurHierarchiqueLandingComponent } from './superieur-hierarchique/superieur-hierarchique-landing/superieur-hierarchique-landing.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { PasswordResetFinishComponent } from './password-reset-finish/password-reset-finish.component';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled',
};

const routes: Routes = [
    {
        path: '',
        component: DashboardPublicComponent,
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./public/home-page/home-page.module').then(
                        (m) => m.HomePageModule
                    ),
            },
            {
                path: 'accueil',
                loadChildren: () =>
                    import('./public/home-page/home-page.module').then(
                        (m) => m.HomePageModule
                    ),
            },
            {
                path: 'apropos',
                data: { breadcrumb: 'Gestion des  Apropos' },
                loadChildren: () =>
                    import(
                        './administration/parametre/apropos/apropos.module'
                    ).then((m) => m.AproposModule),
            },
            {
                path: 'fiches-poste',
                data: { breadcrumb: 'Gestion des  fiches de poste' },
                loadChildren: () =>
                    import(
                        './administration/parametre/fiches-poste/fiches-poste.module'
                    ).then((m) => m.FichesPosteModule),
            },
            {
                path: 'activation-compte',
                loadChildren: () =>
                    import(
                        './public/activation-compte/activation-compte.module'
                    ).then((m) => m.ActivationCompteModule),
            },
            {
                path: 'creation-compte',
                loadChildren: () =>
                    import(
                        './public/creation-compte/creation-compte.module'
                    ).then((m) => m.CreationCompteModule),
            },
            {
                path: 'auth/login',
                data: { breadcrumb: 'Auth' },
                loadChildren: () =>
                    import('./public/login/login.module').then(
                        (m) => m.LoginModule
                    ),
            },
       /*      {
                path: 'mot-de-passe-oublier',
                component: PasswordResetInitComponent,
            }, */
            {
                path: 'reset-password',
                component: PasswordResetFinishComponent,
            },
        ],
    },
    { path: 'modifier-user', component: ModifierUserComponent },
    {
        //path: 'admin', component: AppLayoutComponent, canActivate: [AuthGuard],
        path: 'admin',
        component: AppLayoutComponent,
        // data: {
        // authorities: [Authority.USER,Authority.ADMIN],
        // },
        children: [
            {
                path: '',
              //  canActivate: [AuthGuard],
                loadChildren: () =>
                    import('./administration/administration.module').then(
                        (m) => m.AdministrationModule
                    ),
            },
        ],
    },
    {
        //path: 'admin', component: AppLayoutComponent, canActivate: [AuthGuard],
        path: 'drh',
        component: AppLayoutComponent,
        // data: {
        // authorities: [Authority.USER,Authority.ADMIN],
        // },
        children: [
            {
                path: '',
        //        canActivate: [AuthGuard],
                loadChildren: () =>
                    import('./drh/drh.module').then((m) => m.DrhModule),
            },
        ],
    },
    {
        //path: 'admin', component: AppLayoutComponent, canActivate: [AuthGuard],
        path: 'superieur',
        component: SuperieurHierarchiqueLandingComponent,
        // data: {
        // authorities: [Authority.USER,Authority.ADMIN],
        // },
        children: [
            {
                path: '',
         //       canActivate: [AuthGuard],
                loadChildren: () =>
                    import(
                        './superieur-hierarchique/superieur-hierarchique.module'
                    ).then((m) => m.SuperieurHierarchiqueModule),
            },
        ],
    },
    {
        path: 'agent',
        component: AgentLandingComponent,
        data: {
            authorities: [Authority.USER, Authority.ADMIN],
        },
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./agent/agent.module').then((m) => m.AgentModule),
            },
        ],
    },
    {
        path: 'nouveau-mot-de-passe',
        loadChildren: () =>
            import('./account/newpassword/newpassword.module').then(
                (m) => m.NewPasswordModule
            ),
    },
    {
        path: 'notfound',
        loadChildren: () =>
            import('./shared/notfound/notfound.module').then(
                (m) => m.NotfoundModule
            ),
    },
    {
        path: 'account/confirme-user',
        loadChildren: () =>
            import('./account/validation-compte/validation-compte.module').then(
                (m) => m.ValidationCompteModule
            ),
    },
    {
        path: 'account/confirme',
        loadChildren: () =>
            import('./account/confirme-compte/confirme-compte.module').then(
                (m) => m.ConfirmeCompteModule
            ),
    },
    // { path: 'mot-de-passe-oublier', component: PasswordResetInitComponent },
    //{ path: 'reset-password', component: PasswordResetFinishComponent },

    { path: '**', redirectTo: '/notfound' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
