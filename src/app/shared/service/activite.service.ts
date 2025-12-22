import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IActivite } from '../model/activite';
import { environment } from 'src/environments/environment';
import { createRequestOption } from '../util/request-util';
import { LazyLoadEvent } from 'primeng/api';
import { Observable, map } from 'rxjs';
import { GetAllActiviteResponse } from '../model/get-all-activite-response';

type EntityResponseType = HttpResponse<IActivite>;
type EntityArrayResponseType = HttpResponse<IActivite[]>;
const activiteUrl = environment.activiteResource;
const resourceUrl = environment.activiteResource;
const activiteUrl2 = environment.activiteResourceAgent;
const activiteProposeUrl = environment.propositionActResources;
const resourceModifierUrl = environment.modifierActResources;


@Injectable({
  providedIn: 'root'
})
// export class ActiviteService {

//   constructor(private http:HttpClient) { }
//   create(activite: IActivite): Observable<EntityResponseType> {
//     return this.http.post<IActivite>(activiteUrl, activite, { observe: 'response' });
//   }

//   update(activite: IActivite): Observable<EntityResponseType> {
//     return this.http.put<IActivite>(activiteUrl, activite, { observe: 'response' });
//   }
//   find(id: number): Observable<EntityResponseType> {
//     return this.http.get<IActivite>(`${activiteUrl}/${id}`, { observe: 'response' });
//   }

//   query(req?: any): Observable<EntityArrayResponseType> {
//     const options = createRequestOption(req);
//      return this.http.get<IActivite[]>(activiteUrl, { params: options, observe: 'response' });
//   }

//   findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
//     return this.http.get<IActivite[]>(activiteUrl, { observe: 'response' });
//   }

//   delete(id: number): Observable<HttpResponse<{}>> {
//     return this.http.delete(`${activiteUrl}/${id}`, { observe: 'response' });
//   }
// }



export class ActiviteService {
  createActivite(activite: IActivite, matriculeAgent: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) { }

  getAll(matricule:string, annee:number,event?: LazyLoadEvent):Observable<GetAllActiviteResponse>{
    return this.http.get(activiteUrl2+matricule+'/'+annee, {observe:'response'})
    .pipe(map(response=> {
            let activiteResponse: GetAllActiviteResponse = {
              activites: response.body as IActivite[]
            };
            return activiteResponse;
          }));
  }

  create(request: IActivite): Observable<IActivite> {
    return this.http.post(activiteUrl, request);
  }
  update(request: IActivite): Observable<IActivite> {
    return this.http.put(resourceUrl, request);
  }
  
  updatePropose (request:IActivite, matricule:string): Observable<IActivite>{
    return this.http.put(resourceModifierUrl+matricule, request);
  }

  createPropose(request: IActivite, matricule:string): Observable<IActivite> {
    return this.http.post(activiteProposeUrl+matricule, request);
  }
  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IActivite>(`${activiteUrl}/${id}`, { observe: 'response' });
  }
  

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
     return this.http.get<IActivite[]>(activiteUrl, { params: options, observe: 'response' });
  }

  cloturer(request: IActivite): Observable<EntityResponseType> {
    return this.http.put(resourceUrl+'/cloturer', request,{ observe: 'response' });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${activiteUrl}/${id}`);
  }
}