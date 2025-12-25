import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  sidebarData = [
    {
      title: 'Tableau de bord',
      icon: 'dash',
      links: [
        { name: 'Employé', route: '/employe' },
      ]
    },
    {
      title: 'Comptes',
      icon: 'person',
      links: [
        { name: 'Liste', route: 'compte/liste' },
        { name: 'Créer un compte', route: 'compte/create' },
      ]
    },
    {
      title: 'Paramètre',
      icon: 'settings',
      links: [
        { name: 'Users', route: '/users' },
        { name: 'Roles', route: '/roles' },
        { name: 'Privileges', route: '/privileges' }
      ]  
    }
  ];
}
