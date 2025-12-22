import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategorie } from '../model/categorie';
import { environment } from 'src/environments/environment';
import { createRequestOption } from '../util/request-util';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<ICategorie>;
type EntityArrayResponseType = HttpResponse<ICategorie[]>;
const categorieUrl = environment.categorieResource;

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http:HttpClient) { }
  create(categorie: ICategorie): Observable<EntityResponseType> {
    return this.http.post<ICategorie>(categorieUrl, categorie, { observe: 'response' });
  }

  update(categorie: ICategorie): Observable<EntityResponseType> {
    return this.http.put<ICategorie>(categorieUrl, categorie, { observe: 'response' });
  }
  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICategorie>(`${categorieUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
     return this.http.get<ICategorie[]>(categorieUrl, { params: options, observe: 'response' });
  }

  findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
    return this.http.get<ICategorie[]>(categorieUrl, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${categorieUrl}/${id}`, { observe: 'response' });
  }
}
