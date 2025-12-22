import { Injectable } from '@angular/core';
import { IRapport } from '../model/rapport';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { createRequestOption } from '../util/request-util';

type EntityResponseType = HttpResponse<IRapport>;
type EntityArrayResponseType = HttpResponse<IRapport[]>;

const baseUrl = environment.rapportResource;

@Injectable({
    providedIn: 'root',
})
export class RapportService {
    constructor(private http: HttpClient) {}

    create(rapport: IRapport): Observable<EntityResponseType> {
        return this.http.post<IRapport>(`${baseUrl}/new`, rapport, {
            observe: 'response',
        });
    }

    update(rapport: IRapport): Observable<EntityResponseType> {
        return this.http.put<IRapport>(`${baseUrl}/update`, rapport, {
            observe: 'response',
        });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRapport>(`${baseUrl}/${id}`, {
            observe: 'response',
        });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRapport[]>(`${baseUrl}/list-page`, {
            params: options,
            observe: 'response',
        });
    }

    findAll(): Observable<EntityArrayResponseType> {
        return this.http.get<IRapport[]>(`${baseUrl}/list`, {
            observe: 'response',
        });
    }

    delete(id: number): Observable<HttpResponse<{}>> {
        return this.http.delete(`${baseUrl}/${id}`, { observe: 'response' });
    }

    getrapportsByMinistereId(ministereId: number): Observable<IRapport[]> {
        return this.http.get<IRapport[]>(`${baseUrl}/ministere/${ministereId}`);
    }
}
