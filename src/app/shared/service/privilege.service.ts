import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from '../util/request-util';
import { environment } from 'src/environments/environment';
import { IPrivilege } from '../model/privilege';
import { LazyLoadEvent } from 'primeng/api';

type EntityResponseType = HttpResponse<IPrivilege>;
type EntityArrayResponseType = HttpResponse<IPrivilege[]>;

const resourceUrl = environment.privilegeUrl;

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {

  constructor(protected http: HttpClient) {}

  create(privilege: IPrivilege): Observable<EntityResponseType> {
    return this.http.post<IPrivilege>(resourceUrl, privilege, { observe: 'response' });
  }

  update(privilege: IPrivilege): Observable<EntityResponseType> {
    return this.http.put<IPrivilege>(resourceUrl+'/'+privilege.id, privilege, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPrivilege>(`${resourceUrl}/${id}`, { observe: 'response' });
  }

  findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
    return this.http.get<IPrivilege[]>(resourceUrl, { observe: 'response' });
  }


  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPrivilege[]>(resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${resourceUrl}/${id}`, { observe: 'response' });
  }

  findListe(): Observable<EntityArrayResponseType> {
    return this.http.get<IPrivilege[]>(resourceUrl, { observe: 'response' });
  }
}
