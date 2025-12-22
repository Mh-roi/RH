import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStatistiqueDTO } from '../model/statistique-dto';
import { environment } from 'src/environments/environment';
import { createRequestOption } from '../util/request-util';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { IRapport } from '../model/rapport';

type EntityResponseType = HttpResponse<IStatistiqueDTO>;
type EntityArrayResponseType = HttpResponse<IStatistiqueDTO[]>;

const statistiqueUrl = environment.statRessource;
const statMoyUrl= environment.statMoyRessource;
const apiurl2=environment.statistique ;
// export interface Rapport {
//   typerapport: string;
//   periode: string;
// }
@Injectable({
    providedIn: 'root'
})
export class StatistiqueDTOService {

//debut enlever cette partie apres
  private url = 'assets/data/rapport.json'; // ou une URL d'API
//   private apiUrl = 'http://localhost:8080/api/statistiques/agentStat/';
  private apiUrl = 'https://digicop.gov.bf/api/statistiques/agentStat/';


  getAllRapports(): Observable<IRapport[]> {
    return this.http.get<IRapport[]>(this.url);
  }
  //fin




  getAgentStatistiques(matricule: string, profil: string): Observable<any> {
    const url = `${this.apiUrl}${matricule}/${profil}`;
    return this.http.get(url);
  }

    constructor(private http: HttpClient) { }


    getMoyenneNoteStructure(annee: string, structure: string): Observable<EntityResponseType> {
        return this.http.get(statMoyUrl+ 'moyenneNotesStructAnnee/' +annee+ '/'+structure, { observe: 'response' });
    }

    getMoyenneNoteEvaluateur(annee: string, evaluateur: string): Observable<EntityResponseType> {
        return this.http.get('notes/moyenneNotesEvaluateurAnnee/' + annee+'/'+evaluateur, { observe: 'response' });
    }

    getAllRecours(annee: string): Observable<EntityResponseType> {
        return this.http.get(statistiqueUrl + 'note-recours/' + annee, { observe: 'response' });
    }

    getAllOffices(annee: string): Observable<EntityResponseType> {
        return this.http.get(statistiqueUrl + 'note-offices/' + annee, { observe: 'response' });
    }

    getAllParFonctionnaire(annee: string): Observable<EntityArrayResponseType> {
        return this.http.get<IStatistiqueDTO[]>(statistiqueUrl + 'fonctionnaire-ayant-note/' + annee, { observe: 'response' });
    }

    getAllNoteMinistere(annee: string): Observable<EntityArrayResponseType> {
        return this.http.get<IStatistiqueDTO[]>(statistiqueUrl + 'note-ministere/' + annee, { observe: 'response' });

    }

    getAllActiviteIdentique(annee: string): Observable<EntityArrayResponseType> {
        return this.http.get<IStatistiqueDTO[]>(statistiqueUrl + 'activite-identique/' + annee, { observe: 'response' });

    }

    getAllCompteActif(): Observable<EntityArrayResponseType> {
        return this.http.get<IStatistiqueDTO[]>(statistiqueUrl + 'fonctionnaire-actif', { observe: 'response' });
    }

}
