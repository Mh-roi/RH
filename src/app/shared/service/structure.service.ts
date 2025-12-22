import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStructure } from '../model/structure';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { createRequestOption } from '../util/request-util';
import { LazyLoadEvent } from 'primeng/api';

type EntityResponseType = HttpResponse<IStructure>;
type EntityArrayResponseType = HttpResponse<IStructure[]>;

const baseUrl = environment.structureResource;


@Injectable({
  providedIn: 'root'
})
export class StructureService {

 constructor(private http:HttpClient) { }


  create(structure: IStructure): Observable<EntityResponseType> {
    return this.http.post<IStructure>(`${baseUrl}/new`, structure, { observe: 'response' });
  }

  update(structure: IStructure): Observable<EntityResponseType> {
    return this.http.put<IStructure>(`${baseUrl}/update`, structure, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStructure>(`${baseUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStructure[]>(`${baseUrl}/list-page`, { params: options, observe: 'response' });
  }

  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<IStructure[]>(`${baseUrl}/list`, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${baseUrl}/${id}`, { observe: 'response' });
  }

  getStructuresByMinistereId(ministereId: number): Observable<IStructure[]> {
  return this.http.get<IStructure[]>(`${baseUrl}/ministere/${ministereId}`);
}

  
}
