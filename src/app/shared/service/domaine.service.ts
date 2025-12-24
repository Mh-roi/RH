import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDomaine } from '../model/domaine';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { createRequestOption } from '../util/request-util';
import { LazyLoadEvent } from 'primeng/api';


type EntityResponseType = HttpResponse<IDomaine>;
type EntityArrayResponseType = HttpResponse<IDomaine[]>;
const domaineUrl = environment.domaineResource;
//const critereProfilUrl = environment.critereProfilResource;
@Injectable({
  providedIn: 'root'
})
export class DomaineService {

 constructor(private http:HttpClient) { }

  create(domaine: IDomaine): Observable<EntityResponseType> {
          return this.http.post<IDomaine>(`${domaineUrl}/new`, domaine, { observe: 'response' });
    
  }

  update(domaine: IDomaine): Observable<EntityResponseType> {
  return this.http.put<IDomaine>(`${domaineUrl}/update`, domaine, { observe: 'response' });

  }
  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDomaine>(`${domaineUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
      return this.http.get<IDomaine[]>(`${domaineUrl}/list-page`, { params: options, observe: 'response' });
  }

  

  findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
      return this.http.get<IDomaine[]>(`${domaineUrl}/list`, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${domaineUrl}/${id}`, { observe: 'response' });
  }
}
