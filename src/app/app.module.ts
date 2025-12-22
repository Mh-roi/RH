import { LOCALE_ID, NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { PublicModule } from './public/public.module';
import {
    DialogService,
    DynamicDialogModule,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ComonModule } from './shared/comon/comon.module';
import { DividerModule } from 'primeng/divider';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';

//import { CreerModifierEmploiComponent } from './creer-modifier-emploi/creer-modifier-emploi.component';

import { MessagesModule } from 'primeng/messages';
import { ConfirmationService, MessageService } from 'primeng/api';

import { AccountModule } from './account/account.module';
import { authInterceptorProviders } from './shared/_helpers/auth.interceptor';
import { SuperieurHierarchiqueComponent } from './superieur-hierarchique/superieur-hierarchique.component';
import { MesAgentsComponent } from './mes-agents/mes-agents.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { KnobModule } from 'primeng/knob';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { AppCommonModule } from './shared/common/app-common.module';
import { ToastModule } from 'primeng/toast';
import { BrowserModule } from '@angular/platform-browser';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordResetFinishComponent } from './password-reset-finish/password-reset-finish.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { CalendarModule } from 'primeng/calendar';
registerLocaleData(localeFr, 'fr');


@NgModule({
    declarations: [
        AppComponent,
        SuperieurHierarchiqueComponent,
        MesAgentsComponent,
        PasswordResetFinishComponent,
    
        //  CreerModifierEmploiComponent,
        // ActionToolBarIudComponent
    ],
    imports: [
        AppRoutingModule,
        PublicModule,
        AppLayoutModule,
        ComonModule,
        DividerModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        CardModule,
        ChartModule,
        InputNumberModule,
        DropdownModule,
        KnobModule,
        DynamicDialogModule,
        TableModule,
        DialogModule,
        ProgressBarModule,
        MessageModule,
        AppCommonModule,
        MenubarModule,
        SplitButtonModule,
        ConfirmDialogModule,
        ProgressSpinnerModule,
        PaginatorModule,
        ToastModule,
        BrowserModule,
        InputMaskModule,
        FileUploadModule,
        AvatarModule,
        CalendarModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'fr' },
        // { provide: LocationStrategy, useClass: HashLocationStrategy },
        DialogService,
        ConfirmationService,
        MessageService,
        DynamicDialogRef,
        authInterceptorProviders,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        }
    ],
    exports: [
        // ActionToolBarIudComponent
        // DividerModule
        MessagesModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
