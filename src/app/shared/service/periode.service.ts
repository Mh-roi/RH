import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';
import { map } from 'rxjs/operators';
//import { PaginationService, totalCountHeader } from './pagination.service';
import { IPeriode } from '../model/periode';
import { createRequestOption } from '../util/request-util';
//import { IPeriode } from '../models/periode';

const periodeUrl = environment.periodeResources;
type EntityResponseType = HttpResponse<IPeriode>;
type EntityArrayResponseType = HttpResponse<IPeriode[]>;

@Injectable({
  providedIn: 'root'
})
export class PeriodeService {
    constructor(private http:HttpClient) { }
    create(periode: IPeriode): Observable<EntityResponseType> {
      return this.http.post<IPeriode>(periodeUrl, periode, { observe: 'response' });
    }
  
    update(periode: IPeriode): Observable<EntityResponseType> {
      return this.http.put<IPeriode>(periodeUrl, periode, { observe: 'response' });
    }
    find(id: number): Observable<EntityResponseType> {
      return this.http.get<IPeriode>(`${periodeUrl}/${id}`, { observe: 'response' });
    }
  
    query(req?: any): Observable<EntityArrayResponseType> {
      const options = createRequestOption(req);
       return this.http.get<IPeriode[]>(periodeUrl, { params: options, observe: 'response' });
    }
  
    findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
      return this.http.get<IPeriode[]>(periodeUrl, { observe: 'response' });
    }
  
    delete(id: number): Observable<HttpResponse<{}>> {
      return this.http.delete(`${periodeUrl}/${id}`, { observe: 'response' });
    }
}

