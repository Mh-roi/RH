import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { isEqualCheck } from '@ngrx/store/src/selector';
import {
    ConfirmationService,
    LazyLoadEvent,
    MenuItem,
    Message,
    MessageService,
} from 'primeng/api';
import { Profil } from 'src/app/models/profil';
import { ProfilService } from 'src/app/services/profil.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-profil',
    templateUrl: './profil.component.html',
    styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
    @ViewChild('dtf')
    form!: NgForm;
    timeoutHandle: any;
    totalRecords!: number;
    profils: Profil[] = [];
    selection: any;
    profil: Profil = {};
    recordsPerPage = environment.recordsPerPage;
    enableCreate = true;
    isLoading: boolean = false;
    isOpInProgress: boolean = false;
    isDialogOpInProgress: boolean = false;
    showDialog = false;

    enableBtnInfo = false;
    enableBtnEdit = true;
    enableBtnDelete = true;

    message: any;
    dialogErrorMessage: any;

    contextMenuItems: MenuItem[] = [];
    cols: any[] = [];
    filterFields: any[] = [];
    constructor(
        private confirmationService: ConfirmationService,
        private profilService: ProfilService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.contextMenuItems = [
            {
                label: 'Editer',
                icon: 'pi pi-fw pi-pencil',
                command: () => this.onEdit(),
            },
            {
                label: 'Supprimer',
                icon: 'pi pi-fw pi-trash',
                command: () => this.onDelete(),
            },
        ];
        this.load();
        this.cols = [
            { field: 'libelle', header: 'Libellé' },
            { field: 'province', header: 'Province' },
        ];

        this.filterFields = [
            { name: 'Libellé', code: 'libelle' },
            { name: 'Province', code: 'province' },
        ];
    }

    ngOnDestroy() {
        clearTimeout(this.timeoutHandle);
    }

    load(event?: LazyLoadEvent) {
        this.isLoading = true;
        this.profilService.getAll(event).subscribe(
            (response) => {
                this.isLoading = false;
                this.profils = response.profils;
                console.log(response);
            },
            (error) => {
                this.message = { severity: 'error', summary: error.error };
                console.error(JSON.stringify(error));
            }
        );
    }

    save() {
        if (this.profil.id) {
            this.edit();
        } else {
            this.create();
        }
    }

    // //Creation
    onInfo(selection: any) {
        console.log(selection);
    }

    onCreate() {
        this.profil = {};
        this.clearDialogMessages();
        this.form.resetForm();
        this.showDialog = true;
    }

    create() {
        this.clearDialogMessages();
        this.isDialogOpInProgress = true;
        this.profilService.create(this.profil).subscribe(
            (response) => {
                if (this.profils.length !== this.recordsPerPage) {
                    this.profils.push(response);
                    this.profils = this.profils.slice();
                }
                this.totalRecords++;
                this.isDialogOpInProgress = false;
                this.showDialog = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Profil créée avec succès',
                    life: 5000,
                });
            },
            (error) => this.handleError(error)
        );
    }

    // Edit

    onEdit(profil?: Profil) {
        if (profil) this.selection = profil;
        this.clearDialogMessages();
        this.profil = Object.assign({}, this.selection);
        this.showDialog = true;
    }

    edit() {
        this.clearDialogMessages();
        this.isDialogOpInProgress = true;
        this.profilService.update(this.profil).subscribe(
            (response) => {
                let index = this.profils.findIndex(
                    (profil) => profil.id === response.id
                );
                this.profils[index] = response;
                this.isDialogOpInProgress = false;
                this.showDialog = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Profil modifié avec succès',
                    life: 5000,
                });
            },
            (error) => this.handleError(error)
        );
    }

    isEditing() {
        return !!this.profil.id;
    }

    // Deletion

    onDelete(profil?: Profil) {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer ce profil ?',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.delete(profil);
            },
        });
    }

    delete(profil?: Profil) {
        if (profil) this.selection = profil;
        this.isOpInProgress = true;
        this.profilService.delete(this.selection.id).subscribe(
            () => {
                this.profils = this.profils.filter(
                    (profil) => profil.id !== this.selection.id
                );
                this.selection = null;
                this.isOpInProgress = false;
                this.totalRecords--;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Profil supprimé avec succès',
                    life: 5000,
                });
            },
            (error) => {
                console.error(JSON.stringify(error));
                this.isOpInProgress = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Echec',
                    detail: 'La suppression a échoué',
                    life: 5000,
                });
            }
        );
    }

    // Errors

    handleError(error: HttpErrorResponse) {
        console.error(`Processing Error: ${JSON.stringify(error)}`);
        this.isDialogOpInProgress = false;
        this.dialogErrorMessage = error.error.message;
    }

    // Messages

    clearDialogMessages() {
        this.dialogErrorMessage = null;
    }
}
