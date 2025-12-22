import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from '../util/request-util';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';
import { IRole } from '../model/role';

type EntityResponseType = HttpResponse<IRole>;
type EntityArrayResponseType = HttpResponse<IRole[]>;

const resourceUrl = environment.profilUrl;

@Injectable({
    providedIn: 'root',
})
export class RolesService {
    constructor(protected http: HttpClient) {}

    create(role: IRole): Observable<EntityResponseType> {
        return this.http.post<IRole>(resourceUrl, role, {
            observe: 'response',
        });
    }

    update(role: IRole): Observable<EntityResponseType> {
        return this.http.put<IRole>(resourceUrl, role, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRole>(`${resourceUrl}/${id}`, {
            observe: 'response',
        });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRole[]>(resourceUrl, {
            params: options,
            observe: 'response',
        });
    }

    findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
        return this.http.get<IRole[]>(resourceUrl, { observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<{}>> {
        return this.http.delete(`${resourceUrl}/${id}`, {
            observe: 'response',
        });
    }

    findListe(): Observable<EntityArrayResponseType> {
        return this.http.get<IRole[]>(resourceUrl, { observe: 'response' });
    }
}
