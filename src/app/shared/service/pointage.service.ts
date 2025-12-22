import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IPointage, Pointage } from '../model/pointage.model';
import { API_URLS } from './api_url';

@Injectable({
    providedIn: 'root',
})
export class PointageService {
    // URL de l'API
    private API_URL = API_URLS.URL_POINTAGE;

    constructor(private http: HttpClient) {}

    createPointage(
        agentId: number,
        pointage: IPointage,
        file?: File
    ): Observable<any> {
        const formData = new FormData();
        formData.append(
            'pointage',
            new Blob([JSON.stringify(pointage)], { type: 'application/json' })
        );

        if (file) {
            formData.append('file', file, file.name);
        }

        return this.http.post(`${this.API_URL}/new`, formData).pipe(
            catchError((error) => {
                console.error('Erreur API:', error);
                return throwError(() => new Error('Une erreur est survenue'));
            })
        );
    }

    updatePointage(data: IPointage, file?: File): Observable<any> {
        const formData = new FormData();
        formData.append(
            'pointage',
            new Blob([JSON.stringify(data)], { type: 'application/json' })
        );

        if (file) {
            formData.append('file', file, file.name);
        }

        return this.http.put(`${this.API_URL}/update`, formData).pipe(
            catchError((error) => {
                console.error('Erreur API:', error);
                return throwError(() => new Error('Une erreur est survenue'));
            })
        );
    }

    //supprimer un pointage
    deletePointage(id: number): Observable<any> {
        return this.http.delete(`${this.API_URL}/${id}`).pipe(
            catchError((error) => {
                console.error('Erreur API:', error);
                return throwError(() => new Error('Une erreur est survenue'));
            })
        );
    }
    getPointages(): Observable<Pointage[]> {
        return this.http.get<Pointage[]>(`${this.API_URL}/list`);
    }

    //les pointages du jour
    getPointagesDuJour(): Observable<Pointage[]> {
        return this.http.get<Pointage[]>(`${this.API_URL}/pointages/du-jour`);
    }

    // ✅ Vérifie si l’agent a été pointé aujourd’hui
    hasPointedToday(agentId: number): Observable<boolean> {
        return this.http
            .get<{ hasPointed: boolean }>(
                `${this.API_URL}/pointages/check-today/${agentId}`
            )
            .pipe(map((response) => response.hasPointed));
    }

    getByAgentAndPeriod(
        id: number | null | undefined,
        startDate: Date,
        endDate: Date
    ) {
        return this.http.get<Pointage[]>(
            `${this.API_URL}/pointages/agent/${id}`,
            {
                params: {
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                },
            }
        );
    }

    pointagesJustify(justificationData: {
        agentId: number | null | undefined;
        pointageIds: any;
        comment: any;
        reference: any;
        document: any;
    }) {
        return this.http.post(
            `${this.API_URL}/pointages/justifier`,
            justificationData
        );
    }
    // agent by matricule
    getAgentByMatricule(matricule: string): Observable<any> {
        return this.http.get(`${this.API_URL}/agents/matricule/${matricule}`);
    }

    /* // supprimer un pointage
    deletePointage(id: number): Observable<any> {
        return this.http.delete(`${this.API_URL}/delete/${id}`);
    } */

    getMesPointages(): Observable<Pointage[]> {
        return this.http.get<Pointage[]>(`${this.API_URL}/mes-pointages`).pipe(
            catchError((error) => {
                console.error('Erreur API:', error);
                return throwError(() => new Error('Une erreur est survenue'));
            })
        );
    }

    /// vérifier si l'agent a pointé aujourd'hui
    checkIfPointedToday(matricule: string): Observable<boolean> {
        return this.http
            .get<{ hasPointed: boolean }>(
                `${this.API_URL}/verifier/${matricule}`
            )
            .pipe(map((response) => response.hasPointed));
    }
    verifierPointageJournalier(matricule: string): Observable<Boolean> {
        return this.http.get<Boolean>(`${this.API_URL}/verifier/${matricule}`);
    }
}
