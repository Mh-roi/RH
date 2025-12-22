import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { AnimateEnterDirective } from './animateenter.directive';

import { PublicRoutingModule } from './public-routing.module';
import { DashboardPublicComponent } from './dashboard-public.component';
import { PublicMenuComponent } from './public-menu/public-menu.component';
import { PublicFooterComponent } from './public-footer/public-footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MenubarModule } from 'primeng/menubar';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { KnobModule } from 'primeng/knob';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    AnimateEnterDirective,
    DashboardPublicComponent,
    PublicMenuComponent,
    PublicFooterComponent,
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule,
    StyleClassModule,
    PublicRoutingModule,
    MenubarModule,
    DividerModule,
    FormsModule,
    MessagesModule,
    ButtonModule,
    KnobModule,
    ChartModule,
    TableModule,
  ]
})
export class PublicModule { }
