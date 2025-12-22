import { Injectable } from '@angular/core';
import { IMinistere } from '../model/ministere';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';
import { createRequestOption } from '../util/request-util';
import { GetAllMinistereInstitutionResponse } from '../model/get-all-ministere-institution-response';
import { MinistereInstitution } from '../model/ministere-institution';

type EntityResponseType = HttpResponse<IMinistere>;
type EntityArrayResponseType = HttpResponse<IMinistere[]>;
const ministereUrl = environment.ministereInstitutionResource;
@Injectable({
    providedIn: 'root',
})
export class MinistereService {
    constructor(private http: HttpClient) {}

    /** Créer un nouveau ministère */
    create(ministere: IMinistere): Observable<EntityResponseType> {
        return this.http.post<IMinistere>(`${ministereUrl}/new`, ministere, {
            observe: 'response',
        });
    }

    /** Modifier un ministère existant */
    update(ministere: IMinistere): Observable<EntityResponseType> {
        return this.http.put<IMinistere>(`${ministereUrl}/update`, ministere, {
            observe: 'response',
        });
    }

    /** Récupérer un ministère par ID */
    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMinistere>(`${ministereUrl}/${id}`, {
            observe: 'response',
        });
    }

    /** Récupérer tous les ministères paginés (si nécessaire) */
    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMinistere[]>(`${ministereUrl}/list-page`, {
            params: options,
            observe: 'response',
        });
    }

    // get All ministere
    findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
        return this.http.get<IMinistere[]>(`${ministereUrl}/list`, {
            observe: 'response',
        });
    }

    /** Récupérer tous les ministères sans pagination */
    getAll(): Observable<GetAllMinistereInstitutionResponse> {
        return this.http
            .get(`${ministereUrl}/list`, { observe: 'response' })
            .pipe(
                map((response) => {
                    const ministereInstitutionResponse: GetAllMinistereInstitutionResponse =
                        {
                            ministeres: response.body as MinistereInstitution[],
                        };
                    return ministereInstitutionResponse;
                })
            );
    }

    /** Supprimer un ministère par ID */
    delete(id: number): Observable<HttpResponse<{}>> {
        return this.http.delete(`${ministereUrl}/${id}`, {
            observe: 'response',
        });
    }
}
