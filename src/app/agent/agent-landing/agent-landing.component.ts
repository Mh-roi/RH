import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-agent-landing',
  templateUrl: './agent-landing.component.html',
  styleUrls: ['./agent-landing.component.scss']
})
export class AgentLandingComponent {

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
