import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-public',
  templateUrl: './dashboard-public.component.html',
  styleUrls: ['./dashboard-public.component.scss']
})
export class DashboardPublicComponent implements OnDestroy {

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
