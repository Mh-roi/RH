import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProfilAgent } from '../model/profil-agent';
import { Observable } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { createRequestOption } from '../util/request-util';

type EntityResponseType = HttpResponse<IProfilAgent>;
type EntityArrayResponseType = HttpResponse<IProfilAgent[]>;
const profilAgentUrl = environment.profilResource;
const profilAgentUrl2 = environment.profilResource2;

@Injectable({
  providedIn: 'root'
})
export class ProfilAgentService {



  constructor(private http:HttpClient) { }
 create(categorie: IProfilAgent): Observable<EntityResponseType> {
  return this.http.post<IProfilAgent>(`${profilAgentUrl2}/new`, categorie, { observe: 'response' });
}

update(categorie: IProfilAgent): Observable<EntityResponseType> {
  return this.http.put<IProfilAgent>(`${profilAgentUrl2}/update`, categorie, { observe: 'response' });
}
  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProfilAgent>(`${profilAgentUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
     return this.http.get<IProfilAgent[]>(profilAgentUrl, { params: options, observe: 'response' });
  }

  findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
    return this.http.get<IProfilAgent[]>(profilAgentUrl, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${profilAgentUrl}/${id}`, { observe: 'response' });
  }
}
