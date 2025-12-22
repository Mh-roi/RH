import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { IFPParameter } from '../model/fp-parameter';
import { createRequestOption } from '../util/request-util';
import { environment } from 'src/environments/environment';

type EntityResponseType = HttpResponse<IFPParameter>;
type EntityArrayResponseType = HttpResponse<IFPParameter[]>;

const fPParameterUrl = environment.parametreResource;

@Injectable({
  providedIn: 'root'
})
export class FPParameterService {

  constructor(private http:HttpClient) { }
  create(fPParameter: IFPParameter): Observable<EntityResponseType> {
    return this.http.post<IFPParameter>(fPParameterUrl, fPParameter, { observe: 'response' });
  }

  update(fPParameter: IFPParameter): Observable<EntityResponseType> {
    return this.http.put<IFPParameter>(fPParameterUrl, fPParameter, { observe: 'response' });
  }
  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFPParameter>(`${fPParameterUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
     return this.http.get<IFPParameter[]>(fPParameterUrl, { params: options, observe: 'response' });
  }

  findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
    return this.http.get<IFPParameter[]>(fPParameterUrl, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${fPParameterUrl}/${id}`, { observe: 'response' });
  }
}
