import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IFonctionnaire } from '../model/fonctionnaire';

type EntityResponseType = HttpResponse<IFonctionnaire>;
type EntityArrayResponseType = HttpResponse<IFonctionnaire[]>;

const genererCodeUrl = environment.genererCodeResource;
const afficherCodeUrl = environment.afficherCodeResource;
const affiliationUrl=environment.changeAffiliationResource;
const verifierUrl=environment.verifierAffiliationResource;

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor() { }
}
