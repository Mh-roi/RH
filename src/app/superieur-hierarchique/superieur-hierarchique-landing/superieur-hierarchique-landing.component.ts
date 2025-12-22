import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-superieur-hierarchique-landing',
  templateUrl: './superieur-hierarchique-landing.component.html',
  styleUrls: ['./superieur-hierarchique-landing.component.scss']
})
export class SuperieurHierarchiqueLandingComponent {

  subscription: Subscription;

  darkMode: boolean = false;

  constructor(public router: Router, private layoutService: LayoutService) {
      this.subscription = this.layoutService.configUpdate$.subscribe(config => {
          this.darkMode = config.colorScheme === 'dark' || config.colorScheme === 'dim' ? true : false;
      });
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

}
