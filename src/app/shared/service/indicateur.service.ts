import { Injectable } from '@angular/core';
import { IIndicateur } from '../model/indicateur';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from '../util/request-util';


type EntityResponseType = HttpResponse<IIndicateur>;
type EntityArrayResponseType = HttpResponse<IIndicateur[]>;

const baseUrl = environment.indicateurResource; 


@Injectable({
  providedIn: 'root'
})
export class IndicateurService {

  constructor(private http: HttpClient) { }


  /** POST /api/fonctions/new */
    create(indicateur: IIndicateur): Observable<EntityResponseType> {
      return this.http.post<IIndicateur>(`${baseUrl}/new`, indicateur, { observe: 'response' });
    }
  
    /** PUT /api/fonctions/update */
    update(fonction: IIndicateur): Observable<EntityResponseType> {
      return this.http.put<IIndicateur>(`${baseUrl}/update`, fonction, { observe: 'response' });
    }
  
    /** GET /api/fonctions/{id} */
    find(id: number): Observable<HttpResponse<IIndicateur | null>> {
      return this.http.get<IIndicateur | null>(`${baseUrl}/${id}`, { observe: 'response' });
    }
  
    /** GET /api/fonctions/list-page (with pagination) */
     query(req?: any): Observable<EntityArrayResponseType> {
      const options = createRequestOption(req);
      return this.http.get<IIndicateur[]>(`${baseUrl}/list-page`, { params: options, observe: 'response' });
    } 
  
    /** GET /api/fonctions/list (no pagination) */
    findAll(): Observable<EntityArrayResponseType> {
      return this.http.get<IIndicateur[]>(`${baseUrl}/list`, { observe: 'response' });
    }
  
    /** DELETE /api/fonctions/{id} */
    delete(id: number): Observable<HttpResponse<void>> {
      return this.http.delete<void>(`${baseUrl}/${id}`, { observe: 'response' });
    }
  


}
