import { HttpResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { createRequestOption } from '../util/request-util';
import { IPeriode } from '../model/period';

type EntityResponseType = HttpResponse<IPeriode>;
type EntityArrayResponseType = HttpResponse<IPeriode[]>;
const periodUrl = environment.periodeResources;

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  constructor(private http:HttpClient) { }
  create(periode: IPeriode): Observable<EntityResponseType> {
    return this.http.post<IPeriode>(periodUrl, periode, { observe: 'response' });
  }

  update(periode: IPeriode): Observable<EntityResponseType> {
    return this.http.put<IPeriode>(periodUrl, periode, { observe: 'response' });
  }
  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPeriode>(`${periodUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
     return this.http.get<IPeriode[]>(periodUrl, { params: options, observe: 'response' });
  }

  findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
    return this.http.get<IPeriode[]>(periodUrl, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${periodUrl}/${id}`, { observe: 'response' });
  }
}
