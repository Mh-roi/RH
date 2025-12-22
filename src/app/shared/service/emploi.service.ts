import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmploi } from '../model/emploi';
import { createRequestOption } from '../util/request-util';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';

type EntityResponseType = HttpResponse<IEmploi>;
type EntityArrayResponseType = HttpResponse<IEmploi[]>;

const baseUrl = environment.emploiResource; // e.g. 'http://localhost:8080/api/emplois'

@Injectable({
  providedIn: 'root'
})
export class EmploiService {

  constructor(private http: HttpClient) {}

  /** POST /api/emplois/new */
  create(emploi: IEmploi): Observable<EntityResponseType> {
    return this.http.post<IEmploi>(`${baseUrl}/new`, emploi, { observe: 'response' });
  }

  /** PUT /api/emplois/update */
  update(emploi: IEmploi): Observable<EntityResponseType> {
    return this.http.put<IEmploi>(`${baseUrl}/update`, emploi, { observe: 'response' });
  }

  /** GET /api/emplois/{id} */
  find(id: number): Observable<HttpResponse<IEmploi | null>> {
    return this.http.get<IEmploi | null>(`${baseUrl}/${id}`, { observe: 'response' });
  }

  /** GET /api/emplois/list-page (with pagination) */
  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEmploi[]>(`${baseUrl}/list-page`, { params: options, observe: 'response' });
  }

  /** GET /api/emplois/list (no pagination) */
  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<IEmploi[]>(`${baseUrl}/list`, { observe: 'response' });
  }

  /** DELETE /api/emplois/{id} */
  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${baseUrl}/${id}`, { observe: 'response' });
  }
}
