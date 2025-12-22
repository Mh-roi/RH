import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { API_URLS } from './api_url';
import { IReclamation } from '../model/reclamation';

@Injectable({
    providedIn: 'root',
})
export class ReclamationService {
    private apiUrl = API_URLS.URL_RECLAMATION;

    constructor(private http: HttpClient) {}
    //     createReclamation(reclamation: IReclamation): Observable<IReclamation> {
    createReclamation(reclamation: IReclamation): Observable<IReclamation> {
        return this.http
            .post<IReclamation>(`${this.apiUrl}/new`, reclamation)
            .pipe(
                catchError((error) => {
                    console.error('Erreur API:', error);
                    return throwError(
                        () => new Error('Une erreur est survenue')
                    );
                })
            );
        // map((response) => response)
    }
    deleteReclamation(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    getAllReclamations(): Observable<IReclamation[]> {
        return this.http.get<IReclamation[]>(`${this.apiUrl}/list`);
    }

    getReclamationById(id: number): Observable<IReclamation> {
        return this.http.get<IReclamation>(`${this.apiUrl}/${id}`);
    }
   getReclamationsByFicheId(ficheId: number): Observable<IReclamation[]> {
    return this.http.get<IReclamation[]>(`${this.apiUrl}/list-by-fiche/${ficheId}`).pipe(
        catchError((error) => {
            console.error('Erreur lors de la récupération des réclamations par fiche:', error);
            return throwError(() => new Error('Impossible de charger les réclamations pour cette fiche'));
        })
    );
}

    getReclamationsByAgentId(agentId: number): Observable<IReclamation[]> {
        return this.http.get<IReclamation[]>(`${this.apiUrl}/agent/${agentId}`);
    }
    getReclamationsByStatut(statut: string): Observable<IReclamation[]> {
        return this.http.get<IReclamation[]>(`${this.apiUrl}/statut/${statut}`);
    }
    getReclamationsByDecision(decision: string): Observable<IReclamation[]> {
        return this.http.get<IReclamation[]>(
            `${this.apiUrl}/decision/${decision}`
        );
    }

    updateReclamation(
        id: number,
        reclamation: IReclamation
    ): Observable<IReclamation> {
        return this.http.put<IReclamation>(`${this.apiUrl}/${id}`, reclamation);
    }

   traiterReclamation(reclamation: IReclamation): Observable<IReclamation> {
    return this.http.put<IReclamation>(`${this.apiUrl}/traiter`, reclamation).pipe(
        catchError((error) => {
            console.error(
                'Erreur lors du traitement de la réclamation:',
                error
            );
            return throwError(() => new Error('Erreur lors du traitement de la réclamation'));
        })
    );
}

}
