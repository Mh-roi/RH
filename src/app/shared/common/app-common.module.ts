import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationComponent } from "./confirmation/confirmation.component";
import { CrudToolbarComponent } from "./crud-toolbar/crud-toolbar.component";
import { PanelHeaderComponent } from "./panel-header/panel-header.component";
import { TooltipModule } from 'primeng/tooltip';
import { ActionsToolbarIudComponent } from "./actions-toolbar-iud/actions-toolbar-iud.component";
// import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';

@NgModule({
    declarations: [
        CrudToolbarComponent,
        PanelHeaderComponent,
        ConfirmationComponent,
        ActionsToolbarIudComponent
    ],
    imports: [
        ButtonModule,
        ConfirmDialogModule,
        CommonModule,
        TooltipModule,
        // TieredMenuModule
        MenuModule,
        PanelMenuModule,
    ],
    exports: [
        CrudToolbarComponent,
        PanelHeaderComponent,
        ConfirmationComponent,
        ActionsToolbarIudComponent
    ]
})
export class AppCommonModule {}
