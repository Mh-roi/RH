import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { th } from 'date-fns/locale';
import { ConfirmationService, MessageService } from 'primeng/api';

import {
    DialogService,
    DynamicDialogConfig,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { IAgent } from 'src/app/shared/model/agent';
import { IPointage, Pointage } from 'src/app/shared/model/pointage.model';
import { AgentService } from 'src/app/shared/service/agent.service';
import { FileService } from 'src/app/shared/service/file.service';
import { PointageService } from 'src/app/shared/service/pointage.service';

@Component({
    selector: 'app-detail-pointage',
    templateUrl: './detail-pointage.component.html',
    styleUrls: ['./detail-pointage.component.scss'],
})
export class DetailPointageComponent {
    pointages: IPointage[] = [];
    selectedPointage: IPointage;
    agents: IAgent[] = [];
    loading = false;
    statuses = [
        { label: 'Présent', value: 'present' },
        { label: 'Absent', value: 'absent' },
        { label: 'Absence justifiée', value: 'absent_j' },
    ];

    constructor(
        private pointageService: PointageService,
        private agentService: AgentService,
        private messageService: MessageService,
        private dialogRef: DynamicDialogRef,
        private dynamicDialog: DynamicDialogConfig,
        private http: HttpClient,
        private confirmationService: ConfirmationService
    ) {
        this.pointages = [];
        this.selectedPointage = dynamicDialog.data;
    }

    ngOnInit(): void {
        /// this.loadAgents();
    }

    loadAgents(): void {
        this.agentService.getAllAgent().subscribe({
            next: (response) => {
                this.agents = response.body ?? [];
            },
            error: (err) => {
                this.showError('Erreur de chargement des agents');
            },
        });
    }

    onRowSelect(event: any): void {
        console.log('Pointage sélectionné:', this.selectedPointage);
    }

    getAgentName(agent: IAgent): string {
        // const agent = this.agents.find((a) => a.id === agentId);
        return agent ? `${agent.nom} ${agent.prenom}` : 'Inconnu';
    }

    getStatusLabel(status: string): string {
        const statusObj = this.statuses.find((s) => s.value === status);
        return statusObj ? statusObj.label : status;
    }

    showError(message: string): void {
        this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: message,
        });
    }
    clear(): void {
        this.dialogRef.close();
        this.dialogRef.destroy();
    }

    downloadFile(fileUrl: string): void {
        if (!fileUrl) {
            this.showError('Aucun fichier à télécharger.');
            return;
        }

        this.http.get(fileUrl, { responseType: 'blob' }).subscribe({
            next: (blob) => {
                const link = document.createElement('a');
                const url = window.URL.createObjectURL(blob);
                link.href = url;

                // Extraire le nom du fichier depuis l'URL ou définir un nom par défaut
                const fileName = fileUrl.split('/').pop() || 'document.pdf';
                link.download = fileName;

                link.click();
                window.URL.revokeObjectURL(url);
            },
            error: (error) => {
                console.error(
                    'Erreur lors du téléchargement du fichier :',
                    error
                );
                this.showError(
                    'Échec du téléchargement. Vérifiez vos droits ou contactez un admin.'
                );
            },
        });
    }
}
