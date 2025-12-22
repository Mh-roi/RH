import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IFichesPoste } from '../model/fiches-poste';
import { Observable } from 'rxjs';
import { createRequestOption } from '../util/request-util';
import { LazyLoadEvent } from 'primeng/api';

type EntityResponseType = HttpResponse<IFichesPoste>;
type EntityArrayResponseType = HttpResponse<IFichesPoste[]>;
const fichesPosteUrl = environment.fichesPosteResource;

@Injectable({
  providedIn: 'root'
})
export class FichesPosteService {

  constructor(private http:HttpClient) { }

  create(fichesPoste: any): Observable<EntityResponseType> {
    return this.http.post<IFichesPoste>(fichesPosteUrl, fichesPoste, { observe: 'response' });
  }

  update(fichesPoste: any): Observable<EntityResponseType> {
    return this.http.put<IFichesPoste>(fichesPosteUrl, fichesPoste, { observe: 'response' });
  }
  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFichesPoste>(`${fichesPosteUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
     return this.http.get<IFichesPoste[]>(fichesPosteUrl, { params: options, observe: 'response' });
  }

  findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
    return this.http.get<IFichesPoste[]>(fichesPosteUrl, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${fichesPosteUrl}/${id}`, { observe: 'response' });
  }
  downloadFile(url: string): Observable<Blob> {
    return this.http.get(url, {
      reportProgress: true,
      responseType: 'blob'
    });
  }
}
