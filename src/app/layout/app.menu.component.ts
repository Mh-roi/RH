import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    ngOnInit() {
        const profil = localStorage.getItem('profil');

        if (profil === 'Administrateur') {
            this.model = [
                {
                    label: 'Dashboard',
                    icon: 'pi pi-home',
                    items: [
                        {
                            label: 'Tableau de bord',
                            icon: 'pi pi-fw pi-home',
                            routerLink: ['/admin']
                        },
                        {
                            label: 'Statistique',
                            icon: 'pi pi-fw pi-chart-bar',
                            routerLink: ['/admin/statistique']
                        },
                         {
                            label: 'Rapport-Synthese',
                            icon: 'pi pi-fw pi-chart-bar',
                            routerLink: ['/admin/rapport']
                        },
                        {
                            label: 'Paramètres',
                            icon: 'pi pi-fw pi-cog',
                            items: [
                                { label: 'Fonctionnaire', icon: 'pi pi-fw pi-users', routerLink: ['/admin/fonctionnaire'] },
                                { label: 'Ministère', icon: 'pi pi-fw pi-building', routerLink: ['/admin/ministere'] },
                                
                                { label: 'Structure', icon: 'pi pi-fw pi-building', routerLink: ['/admin/structure'] },

                                { label: 'Fonction', icon: 'pi pi-fw pi-briefcase', routerLink: ['/admin/fonction'] },
                             
                                { label: 'Emploi', icon: 'pi pi-fw pi-briefcase', routerLink: ['/admin/emploi'] },

                                { label: 'Catégorie', icon: 'pi pi-fw pi-th-large', routerLink: ['/admin/categorie'] },
                                { label: 'Profil Agent', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/profil-agent'] },
                                { label: 'Critère', icon: 'pi pi-fw pi-sliders-h', routerLink: ['/admin/critere'] },
                                { label: 'Période', icon: 'pi pi-fw pi-calendar', routerLink: ['/admin/periode'] },

                                 { label: 'Indicateur', icon: 'pi pi-fw pi-calendar', routerLink: ['/admin/indicateur'] }

                            ]
                        }
                    ]
                }
            ];
        } else if (profil === 'DRH') {
            this.model = [
                {
                    label: 'Dashboard',
                    icon: 'pi pi-home',
                    items: [
                        {
                            label: 'Tableau de bord',
                            icon: 'pi pi-fw pi-home',
                            routerLink: ['/drh']
                        },
                        {
                            label: 'Mes agents',
                            icon: 'pi pi-fw pi-users',
                            routerLink: ['/drh/mes-agents']
                        },
                           {
                            label: 'Mes pointages',
                            icon: 'pi pi-fw pi-users',
                            routerLink: ['/drh/mes-pointages']
                        },
                        {
                            label: 'Fiches',
                            icon: 'pi pi-fw pi-file',
                            routerLink: ['/drh/fiche']
                        },
                        {
                            label: 'Statistiques',
                            icon: 'pi pi-fw pi-chart-bar',
                            routerLink: ['/drh/statistique']
                        },

                          {
                            label: 'Rapports',
                            icon: 'pi pi-fw pi-chart-bar',
                            routerLink: ['/drh/rapport']
                        },

                        {
                            label: 'Paramètres',
                            icon: 'pi pi-fw pi-cog',
                            items: [
                                { label: 'Fonctionnaire', icon: 'pi pi-fw pi-users', routerLink: ['/admin/fonctionnaire'] },
                                { label: 'Ministère', icon: 'pi pi-fw pi-building', routerLink: ['/admin/ministere'] },
                                { label: 'Structure', icon: 'pi pi-fw pi-building', routerLink: ['/admin/structure'] },
                                { label: 'Fonction', icon: 'pi pi-fw pi-briefcase', routerLink: ['/admin/fonction'] },
                                { label: 'Profil Agent', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/profil-agent'] },
                            ]
                        }
                    ]
                }
            ];
        }




        else if (profil === 'SPMABG') {
            this.model = [
                {
                    label: 'Dashboard',
                    icon: 'pi pi-home',
                    items: [
                        {
                            label: 'Tableau de bord',
                            icon: 'pi pi-fw pi-home',
                            routerLink: ['/drh']
                        },
                        {
                            label: 'Fiches',
                            icon: 'pi pi-fw pi-file',
                            routerLink: ['/drh/fiche']
                        },
                        {
                            label: 'Statistiques',
                            icon: 'pi pi-fw pi-chart-bar',
                            routerLink: ['/drh/statistique']
                        },

                          {
                            label: 'Rapports',
                            icon: 'pi pi-fw pi-chart-bar',
                            routerLink: ['/drh/rapport']
                        }
                    ]
                }
            ];
        }
    }



}
