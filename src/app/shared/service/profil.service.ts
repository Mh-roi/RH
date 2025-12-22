import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from '../util/request-util';
import { environment } from 'src/environments/environment';
import { IFonction } from '../model/fonction';
import { LazyLoadEvent } from 'primeng/api';

type EntityResponseType = HttpResponse<IFonction>;
type EntityArrayResponseType = HttpResponse<IFonction[]>;

const resourceUrl = environment.profilUrl;

@Injectable({
  providedIn: 'root'
})
export class FonctionService {

  constructor(protected http: HttpClient) {}

  create(fonction: IFonction): Observable<EntityResponseType> {
    return this.http.post<IFonction>(resourceUrl, fonction, { observe: 'response' });
  }

  update(fonction: IFonction): Observable<EntityResponseType> {
    return this.http.post<IFonction>(resourceUrl, fonction, { observe: 'response' });
  }

  // addPrivilege(fonction: IFonctionDTO): Observable<EntityResponseType> {
  //   return this.http.put<IFonction>(resourceUrl, fonction, { observe: 'response' });
  // }

  
  findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
    return this.http.get<IFonction[]>(resourceUrl, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFonction>(`${resourceUrl}/${id}`, { observe: 'response' });
  }

  findByName(name?: string): Observable<EntityResponseType> {
    return this.http.get<IFonction>(`${resourceUrl}/${name}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFonction[]>(resourceUrl, { params: options, observe: 'response' });
  }

  delete(name: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${resourceUrl}/${name}`, { observe: 'response' });
  }

  findListe(): Observable<EntityArrayResponseType> {
    return this.http.get<IFonction[]>(resourceUrl, { observe: 'response' });
  }
}
