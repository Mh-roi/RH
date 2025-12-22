import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFonction } from '../model/fonction';
import { createRequestOption } from '../util/request-util';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';

type EntityResponseType = HttpResponse<IFonction>;
type EntityArrayResponseType = HttpResponse<IFonction[]>;

const baseUrl = environment.fonctionResource; // e.g. 'http://localhost:8080/api/fonctions'

@Injectable({
  providedIn: 'root'
})
export class FonctionService {

  constructor(private http: HttpClient) {}

  /** POST /api/fonctions/new */
  create(fonction: IFonction): Observable<EntityResponseType> {
    return this.http.post<IFonction>(`${baseUrl}/new`, fonction, { observe: 'response' });
  }

  /** PUT /api/fonctions/update */
  update(fonction: IFonction): Observable<EntityResponseType> {
    return this.http.put<IFonction>(`${baseUrl}/update`, fonction, { observe: 'response' });
  }

  /** GET /api/fonctions/{id} */
  find(id: number): Observable<HttpResponse<IFonction | null>> {
    return this.http.get<IFonction | null>(`${baseUrl}/${id}`, { observe: 'response' });
  }

  /** GET /api/fonctions/list-page (with pagination) */
  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFonction[]>(`${baseUrl}/list-page`, { params: options, observe: 'response' });
  }

  /** GET /api/fonctions/list (no pagination) */
  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<IFonction[]>(`${baseUrl}/list`, { observe: 'response' });
  }

  /** DELETE /api/fonctions/{id} */
  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${baseUrl}/${id}`, { observe: 'response' });
  }

  
}
