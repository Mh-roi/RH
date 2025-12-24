import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IObjectif } from '../model/objectif';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { createRequestOption } from '../util/request-util';
import { LazyLoadEvent } from 'primeng/api';
type EntityResponseType = HttpResponse<IObjectif>;
type EntityArrayResponseType = HttpResponse<IObjectif[]>;
const objectifUrl = environment.objectifResource;


@Injectable({
  providedIn: 'root'
})
export class ObjectifService {

 constructor(private http:HttpClient) { }

  create(objectif: IObjectif): Observable<EntityResponseType> {
        return this.http.post<IObjectif>(`${objectifUrl}/new`, objectif, { observe: 'response' });

  }

  update(objectif: IObjectif): Observable<EntityResponseType> {
  
    return this.http.put<IObjectif>(`${objectifUrl}/update`, objectif, { observe: 'response' });
    
  }
  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IObjectif>(`${objectifUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
           return this.http.get<IObjectif[]>(`${objectifUrl}/list-page`, { params: options, observe: 'response' });
     
  }

  

  findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
           return this.http.get<IObjectif[]>(`${objectifUrl}/list`, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${objectifUrl}/${id}`, { observe: 'response' });
  }
}
