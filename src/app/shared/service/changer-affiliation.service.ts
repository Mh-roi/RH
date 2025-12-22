import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangerAffiliationService {

  constructor(protected http: HttpClient) { }

}
