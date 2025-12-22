import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { createRequestOption } from '../util/request-util';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { ICritere } from '../model/critere';

type EntityResponseType = HttpResponse<ICritere>;
type EntityArrayResponseType = HttpResponse<ICritere[]>;
const critereUrl = environment.critereResource;
const critereProfilUrl = environment.critereProfilResource;

@Injectable({
  providedIn: 'root'
})
export class CritereService {

  constructor(private http:HttpClient) { }

  create(critere: ICritere): Observable<EntityResponseType> {
    return this.http.post<ICritere>(critereUrl, critere, { observe: 'response' });
  }

  update(critere: ICritere): Observable<EntityResponseType> {
    return this.http.put<ICritere>(critereUrl, critere, { observe: 'response' });
  }
  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICritere>(`${critereUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
     return this.http.get<ICritere[]>(critereUrl, { params: options, observe: 'response' });
  }

  queryForNote(idFonc: number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
     return this.http.get<ICritere[]>(`${critereProfilUrl}/${idFonc}`, { params: options, observe: 'response' });
  }

  findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
    return this.http.get<ICritere[]>(critereUrl, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${critereUrl}/${id}`, { observe: 'response' });
  }
}
